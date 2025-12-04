-- Fix Payments Table and RLS
-- Ensures payments table exists and has correct columns for dashboard stats

CREATE TABLE IF NOT EXISTS public.payments (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  proposal_id uuid REFERENCES public.proposals(id) ON DELETE SET NULL,
  amount_cents integer NOT NULL CHECK (amount_cents >= 0),
  currency text NOT NULL DEFAULT 'BRL',
  status text NOT NULL DEFAULT 'pendente', -- pendente, pago, falhou
  provider_id text, -- stripe_id, etc
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "payments_select_own" ON public.payments;
DROP POLICY IF EXISTS "payments_select_admin" ON public.payments;
DROP POLICY IF EXISTS "payments_insert_auth" ON public.payments;
DROP POLICY IF EXISTS "payments_update_admin" ON public.payments;

-- Policies
CREATE POLICY "payments_select_own" ON public.payments
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "payments_select_admin" ON public.payments
FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

CREATE POLICY "payments_insert_auth" ON public.payments
FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "payments_update_admin" ON public.payments
FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

SELECT 'Payments table fixed' as status;
