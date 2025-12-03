-- SQL para configurar Realtime corretamente
-- Garante que sender_type e sender_id sejam retornados pelo realtime

-- 1. Alterar replica identity para FULL (retorna todas as colunas)
ALTER TABLE public.messages REPLICA IDENTITY FULL;
ALTER TABLE public.chat_sessions REPLICA IDENTITY FULL;

-- 2. Habilitar realtime para as tabelas
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_sessions;

-- 3. Verificar configuração
SELECT 
  schemaname,
  tablename,
  pubname
FROM pg_publication_tables 
WHERE tablename IN ('messages', 'chat_sessions');

-- 4. Verificar replica identity
SELECT 
  c.relname as table_name,
  CASE c.relreplident
    WHEN 'd' THEN 'default'
    WHEN 'n' THEN 'nothing'
    WHEN 'f' THEN 'full'
    WHEN 'i' THEN 'index'
  END as replica_identity
FROM pg_class c
WHERE c.relname IN ('messages', 'chat_sessions');