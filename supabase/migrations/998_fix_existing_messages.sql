-- SQL para corrigir mensagens existentes
-- Atualiza sender_type das mensagens antigas

-- 1. Atualizar mensagens existentes que têm user_id mas não têm sender_type
UPDATE public.messages 
SET sender_type = 'user' 
WHERE user_id IS NOT NULL AND sender_type IS NULL;

-- 2. Atualizar mensagens que são obviamente do bot (baseado no conteúdo)
UPDATE public.messages 
SET 
  sender_type = 'bot',
  sender_id = 'bot-vrz-assistant',
  user_id = NULL
WHERE 
  content LIKE '%VRZ Assistant%' 
  OR content LIKE '%assistente da VRZ%'
  OR content LIKE '%Como posso ajudá-lo%'
  OR content LIKE '%Sou o assistente%';

-- 3. Limpar mensagens duplicadas se necessário (opcional)
-- DELETE FROM public.messages 
-- WHERE id NOT IN (
--   SELECT DISTINCT ON (content, created_at) id 
--   FROM public.messages 
--   ORDER BY content, created_at, id
-- );

-- 4. Verificar resultado
SELECT 
  sender_type,
  sender_id,
  user_id IS NOT NULL as has_user_id,
  COUNT(*) as count
FROM public.messages 
GROUP BY sender_type, sender_id, (user_id IS NOT NULL)
ORDER BY sender_type;

-- 5. Mostrar últimas mensagens
SELECT 
  id,
  sender_type,
  sender_id,
  user_id,
  content,
  created_at
FROM public.messages 
ORDER BY created_at DESC 
LIMIT 5;