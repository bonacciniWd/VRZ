-- Final Fix for RLS Stability
-- Separates concerns to ensure Proposals are always visible to admins regardless of function quirks

-- 1. Ensure Profiles "Select Own" exists (Foundation)
-- This allows any user (admin or not) to read their own 'role' field
DROP POLICY IF EXISTS "profiles_select_own" ON public.profiles;
CREATE POLICY "profiles_select_own" ON public.profiles
FOR SELECT USING (id = auth.uid());

-- 2. Proposals Admin Policy: Direct Subquery
-- We switch to a direct subquery instead of a function for Proposals.
-- This is robust because it relies on "profiles_select_own" (Step 1) to succeed.
-- It avoids "SECURITY DEFINER" context switching issues.
DROP POLICY IF EXISTS "proposals_select_admin" ON public.proposals;
CREATE POLICY "proposals_select_admin" ON public.proposals
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- 3. Profiles Admin Policy: Security Definer Function
-- We ONLY use the function here, where recursion is a real danger.
-- We rename it to avoid conflicts with previous versions.
CREATE OR REPLACE FUNCTION public.check_is_admin_secure()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$;

DROP POLICY IF EXISTS "profiles_select_admin" ON public.profiles;
CREATE POLICY "profiles_select_admin" ON public.profiles
FOR SELECT
USING ( public.check_is_admin_secure() );

-- 4. Update Proposals Update Policy as well
DROP POLICY IF EXISTS "proposals_update_admin" ON public.proposals;
CREATE POLICY "proposals_update_admin" ON public.proposals
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- 5. Ensure Storage Policies are correct (Public bucket)
UPDATE storage.buckets SET public = true WHERE id = 'data';

DROP POLICY IF EXISTS "data_select_public" ON storage.objects;
CREATE POLICY "data_select_public" ON storage.objects
FOR SELECT
USING ( bucket_id = 'data' );

DROP POLICY IF EXISTS "data_insert_auth" ON storage.objects;
CREATE POLICY "data_insert_auth" ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'data' 
  AND 
  auth.role() = 'authenticated'
);

SELECT 'Fixed RLS policies applied' as status;
