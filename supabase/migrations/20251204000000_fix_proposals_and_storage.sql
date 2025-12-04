-- Migration to fix Proposals RLS and Storage Permissions
-- Created to solve: Admin not seeing proposals, Users not being able to upload documents
-- FIXED: Infinite recursion in profiles policies

-- 0. Helper function to check admin status without triggering RLS recursion
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER -- Bypasses RLS
SET search_path = public -- Security best practice
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$;

-- 1. Ensure PROPOSALS table exists (if not already)
CREATE TABLE IF NOT EXISTS public.proposals (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text,
  amount_cents integer NOT NULL DEFAULT 0 CHECK (amount_cents >= 0),
  currency text NOT NULL DEFAULT 'BRL',
  status text NOT NULL DEFAULT 'rascunho', -- rascunho, enviada, aprovada, rejeitada
  tech_tags text[] DEFAULT '{}',
  images jsonb DEFAULT '[]',
  documents jsonb DEFAULT '[]',
  invited_email text,
  invited_user uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  installments text, -- Condições de pagamento/parcelas
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 2. Enable RLS on proposals
ALTER TABLE public.proposals ENABLE ROW LEVEL SECURITY;

-- 3. Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "proposals_select_own" ON public.proposals;
DROP POLICY IF EXISTS "proposals_select_admin" ON public.proposals;
DROP POLICY IF EXISTS "proposals_insert_auth" ON public.proposals;
DROP POLICY IF EXISTS "proposals_update_own" ON public.proposals;
DROP POLICY IF EXISTS "proposals_update_admin" ON public.proposals;

-- 4. Create Policies for Proposals

-- SELECT: Users see their own proposals OR proposals where they are the invited user
CREATE POLICY "proposals_select_own" ON public.proposals
FOR SELECT
USING (
  auth.uid() = user_id 
  OR 
  auth.uid() = invited_user
);

-- SELECT: Admins see ALL proposals
-- Uses is_admin() to avoid recursion if we were checking profiles directly
CREATE POLICY "proposals_select_admin" ON public.proposals
FOR SELECT
USING ( public.is_admin() );

-- INSERT: Authenticated users can create proposals
CREATE POLICY "proposals_insert_auth" ON public.proposals
FOR INSERT
WITH CHECK (
  auth.uid() = user_id
);

-- UPDATE: Users can update their own proposals (e.g. while in draft)
CREATE POLICY "proposals_update_own" ON public.proposals
FOR UPDATE
USING (auth.uid() = user_id);

-- UPDATE: Admins can update any proposal (e.g. to change status)
CREATE POLICY "proposals_update_admin" ON public.proposals
FOR UPDATE
USING ( public.is_admin() );


-- 5. Storage Policies for 'data' bucket

-- Ensure bucket exists (idempotent insert)
INSERT INTO storage.buckets (id, name, public)
VALUES ('data', 'data', true)
ON CONFLICT (id) DO NOTHING;

-- Drop existing storage policies for 'data' to avoid conflicts
DROP POLICY IF EXISTS "data_select_public" ON storage.objects;
DROP POLICY IF EXISTS "data_insert_auth" ON storage.objects;
DROP POLICY IF EXISTS "data_update_own" ON storage.objects;
DROP POLICY IF EXISTS "data_delete_own" ON storage.objects;

-- SELECT: Public access (since bucket is public)
CREATE POLICY "data_select_public" ON storage.objects
FOR SELECT
USING ( bucket_id = 'data' );

-- INSERT: Authenticated users can upload to 'data'
CREATE POLICY "data_insert_auth" ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'data' 
  AND 
  auth.role() = 'authenticated'
);

-- UPDATE: Users can update their own files
CREATE POLICY "data_update_own" ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'data' 
  AND 
  auth.uid() = owner
);

-- DELETE: Users can delete their own files
CREATE POLICY "data_delete_own" ON storage.objects
FOR DELETE
USING (
  bucket_id = 'data' 
  AND 
  auth.uid() = owner
);

-- 6. Profiles Policies (from user request, just in case)
-- Ensure profiles table exists (it should, but for completeness)
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email text,
  role text DEFAULT 'user',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own profile (essential for role checks)
DROP POLICY IF EXISTS "profiles_select_own" ON public.profiles;
CREATE POLICY "profiles_select_own" ON public.profiles
FOR SELECT USING (id = auth.uid());

-- Allow admins to read all profiles
-- Uses is_admin() to avoid recursion
DROP POLICY IF EXISTS "profiles_select_admin" ON public.profiles;
CREATE POLICY "profiles_select_admin" ON public.profiles
FOR SELECT USING ( public.is_admin() );

DROP POLICY IF EXISTS profiles_update_self ON public.profiles;
CREATE POLICY profiles_update_self
ON public.profiles FOR UPDATE
USING (id = auth.uid())
WITH CHECK (id = auth.uid());

DROP POLICY IF EXISTS profiles_update_admin ON public.profiles;
CREATE POLICY profiles_update_admin
ON public.profiles FOR UPDATE
USING ( public.is_admin() )
WITH CHECK ( public.is_admin() );

-- Trigger to prevent role change by non-admins
CREATE OR REPLACE FUNCTION public.prevent_profile_role_change()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'UPDATE' THEN
    IF NEW.role IS DISTINCT FROM OLD.role THEN
      IF NOT public.is_admin() THEN
        RAISE EXCEPTION 'Você não tem permissão para mudar role';
      END IF;
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_prevent_profile_role_change ON public.profiles;
CREATE TRIGGER trg_prevent_profile_role_change
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.prevent_profile_role_change();

SELECT 'Migration applied successfully' as status;
