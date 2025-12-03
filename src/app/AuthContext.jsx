import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;
      setSession(data.session);
      if (data.session?.user) await loadProfile(data.session.user.id);
      setLoading(false);
    })();
    const { data: sub } = supabase.auth.onAuthStateChange((_event, sess) => {
      setSession(sess);
      if (sess?.user) loadProfile(sess.user.id);
      else setProfile(null);
    });
    return () => { mounted = false; sub.subscription.unsubscribe(); };
  }, []);

  async function loadProfile(userId) {
    const { data } = await supabase.from('profiles').select('*').eq('id', userId).single();
    if (!data) {
      await ensureProfile(userId);
      const { data: again } = await supabase.from('profiles').select('*').eq('id', userId).single();
      setProfile(again || null);
    } else {
      setProfile(data);
    }
  }

  async function signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  }

  async function signUp(email, password) {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    if (data.session?.user) await ensureProfile(data.session.user.id, email);
    return data;
  }

  async function signOut() {
    await supabase.auth.signOut();
    setProfile(null);
  }

  async function ensureProfile(userId, emailHint) {
    try {
      // Try insert self profile (requires RLS policy allowing insert where id = auth.uid())
      const { error } = await supabase.from('profiles').insert({ id: userId, email: emailHint }).select('*').single();
      if (error && !/duplicate key/i.test(error.message)) {
        // swallow; may rely on trigger or admin creation
        console.warn('ensureProfile failed:', error.message);
      }
    } catch (e) {
      console.warn('ensureProfile exception:', e);
    }
  }

  const value = { session, profile, loading, signIn, signUp, signOut };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
