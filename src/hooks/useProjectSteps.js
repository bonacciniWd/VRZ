import { useCallback, useEffect, useRef, useState } from 'react';
import { supabase } from '../lib/supabase.js';
import { mapStepStatus, mapObjectFromDB, mapObjectToDB } from '../utils/enumMapping.js';

/*
Project Steps schema (real from Supabase):

CREATE TABLE public.project_steps (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  proposal_id uuid NOT NULL,
  title text NOT NULL,
  description text,
  step_order integer NOT NULL DEFAULT 1,
  status enum NOT NULL DEFAULT 'pendente', -- pendente | em_andamento | concluido
  created_at timestamptz DEFAULT now(),
  
  FOREIGN KEY (proposal_id) REFERENCES proposals(id)
);

Purpose: Track project timeline/milestones for each proposal
- Each proposal can have multiple ordered steps
- Steps show progress from draft to completion
- Users see progress, admins manage steps
*/

export function useProjectSteps({ proposalId = null, autoSubscribe = true } = {}) {
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const channelRef = useRef(null);

  const fetchSteps = useCallback(async () => {
    if (!proposalId) {
      setSteps([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data, error: qError } = await supabase
        .from('project_steps')
        .select('*')
        .eq('proposal_id', proposalId)
        .order('step_order', { ascending: true });

      if (qError) {
        console.error('❌ Error fetching steps:', qError);
        setError(qError.message);
        setSteps([]);
      } else {
        // Map from DB format (PT → EN)
        const mappedData = (data || []).map(step =>
          mapObjectFromDB(step, { status: mapStepStatus })
        );
        setSteps(mappedData);
      }
    } catch (e) {
      console.error('❌ Exception fetching steps:', e);
      setError(e.message);
      setSteps([]);
    } finally {
      setLoading(false);
    }
  }, [proposalId]);

  const createStep = useCallback(
    async ({ proposal_id = proposalId, title, description = '', step_order = null }) => {
      if (!proposal_id) throw new Error('proposal_id is required');
      if (!title?.trim()) throw new Error('Step title is required');

      // If step_order not provided, append to end
      let finalOrder = step_order;
      if (finalOrder === null) {
        const maxOrder = steps.reduce((max, s) => Math.max(max, s.step_order || 0), 0);
        finalOrder = maxOrder + 1;
      }

      const dbStep = {
        proposal_id,
        title: title.trim(),
        description: description?.trim() || null,
        step_order: finalOrder,
        status: mapStepStatus.toDB('pending'), // Default to 'pendente'
      };

      const { data, error: cError } = await supabase
        .from('project_steps')
        .insert(dbStep)
        .select()
        .single();

      if (cError) throw cError;

      // Map back to code format
      const mappedStep = mapObjectFromDB(data, { status: mapStepStatus });

      setSteps(prev => [...prev, mappedStep].sort((a, b) => a.step_order - b.step_order));
      return mappedStep;
    },
    [proposalId, steps]
  );

  const updateStep = useCallback(async (id, updates) => {
    const updateData = { ...updates };

    // Map status if provided
    if (updateData.status) {
      updateData.status = mapStepStatus.toDB(updateData.status);
    }

    const { data, error: uError } = await supabase
      .from('project_steps')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (uError) throw uError;

    // Map back to code format
    const mappedStep = mapObjectFromDB(data, { status: mapStepStatus });

    setSteps(prev =>
      prev.map(s => (s.id === id ? mappedStep : s)).sort((a, b) => a.step_order - b.step_order)
    );
    return mappedStep;
  }, []);

  const updateStepStatus = useCallback(
    async (id, status) => {
      return updateStep(id, { status });
    },
    [updateStep]
  );

  const reorderSteps = useCallback(async (proposal_id, orderedStepIds) => {
    // Update step_order for each step based on array index
    const updates = orderedStepIds.map((stepId, index) => ({
      id: stepId,
      step_order: index + 1,
    }));

    // Batch update all steps
    const promises = updates.map(({ id, step_order }) =>
      supabase.from('project_steps').update({ step_order }).eq('id', id).select().single()
    );

    const results = await Promise.all(promises);

    // Check for errors
    const errors = results.filter(r => r.error);
    if (errors.length > 0) {
      throw new Error(`Failed to reorder steps: ${errors.map(e => e.error.message).join(', ')}`);
    }

    // Map all results
    const mappedSteps = results.map(r =>
      mapObjectFromDB(r.data, { status: mapStepStatus })
    );

    // Update local state
    setSteps(mappedSteps.sort((a, b) => a.step_order - b.step_order));
    return mappedSteps;
  }, []);

  const deleteStep = useCallback(async (id) => {
    const { error: dError } = await supabase.from('project_steps').delete().eq('id', id);

    if (dError) throw dError;

    setSteps(prev => prev.filter(s => s.id !== id));
  }, []);

  // Realtime subscription
  useEffect(() => {
    if (!autoSubscribe || !proposalId) return;

    // Cleanup previous channel
    if (channelRef.current) {
      supabase.removeChannel(channelRef.current);
      channelRef.current = null;
    }

    const channel = supabase
      .channel(`project-steps-${proposalId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'project_steps',
          filter: `proposal_id=eq.${proposalId}`,
        },
        payload => {
          // Map realtime payloads from DB format (PT → EN)
          if (payload.eventType === 'INSERT') {
            const mappedStep = mapObjectFromDB(payload.new, { status: mapStepStatus });
            setSteps(prev => {
              const exists = prev.some(s => s.id === mappedStep.id);
              if (exists) return prev;
              return [...prev, mappedStep].sort((a, b) => a.step_order - b.step_order);
            });
          } else if (payload.eventType === 'UPDATE') {
            const mappedStep = mapObjectFromDB(payload.new, { status: mapStepStatus });
            setSteps(prev =>
              prev
                .map(s => (s.id === mappedStep.id ? mappedStep : s))
                .sort((a, b) => a.step_order - b.step_order)
            );
          } else if (payload.eventType === 'DELETE') {
            setSteps(prev => prev.filter(s => s.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    channelRef.current = channel;

    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }
    };
  }, [autoSubscribe, proposalId]);

  useEffect(() => {
    fetchSteps();
  }, [fetchSteps]);

  // Computed values
  const totalSteps = steps.length;
  const completedSteps = steps.filter(s => s.status === 'completed').length;
  const progressPercent = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;

  return {
    steps,
    loading,
    error,
    totalSteps,
    completedSteps,
    progressPercent,
    fetchSteps,
    createStep,
    updateStep,
    updateStepStatus,
    reorderSteps,
    deleteStep,
  };
}

export default useProjectSteps;
