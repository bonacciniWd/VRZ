-- SQL de diagnóstico - Execute para verificar estrutura
-- Verifica se as colunas sender_type e sender_id existem

-- 1. Verificar estrutura da tabela messages
SELECT 
  column_name, 
  data_type, 
  is_nullable, 
  column_default
FROM information_schema.columns 
WHERE table_schema = 'public' 
  AND table_name = 'messages'
ORDER BY ordinal_position;

-- 2. Verificar dados existentes
SELECT 
  id,
  user_id,
  sender_type,
  sender_id,
  content,
  created_at
FROM public.messages
ORDER BY created_at DESC
LIMIT 10;

-- 3. Verificar políticas RLS
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE schemaname = 'public' 
  AND tablename = 'messages';

-- 4. Se as colunas não existirem, adicionar manualmente
DO $$
BEGIN
    -- Verificar se sender_type existe
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
          AND table_name = 'messages' 
          AND column_name = 'sender_type'
    ) THEN
        RAISE NOTICE 'Adicionando coluna sender_type...';
        ALTER TABLE public.messages 
        ADD COLUMN sender_type text DEFAULT 'user' CHECK (sender_type IN ('user', 'bot', 'system'));
    END IF;

    -- Verificar se sender_id existe
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
          AND table_name = 'messages' 
          AND column_name = 'sender_id'
    ) THEN
        RAISE NOTICE 'Adicionando coluna sender_id...';
        ALTER TABLE public.messages 
        ADD COLUMN sender_id text;
    END IF;

    RAISE NOTICE 'Verificação concluída!';
END $$;