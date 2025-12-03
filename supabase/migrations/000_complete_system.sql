-- SQL Único Completo - Execute APENAS ESTE
-- Drop e recria tudo do zero

-- 1. Drop tabelas existentes
DROP TABLE IF EXISTS public.messages CASCADE;
DROP TABLE IF EXISTS public.chat_sessions CASCADE;
DROP VIEW IF EXISTS public.active_chat_sessions CASCADE;
DROP FUNCTION IF EXISTS mark_inactive_sessions() CASCADE;
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;

-- 2. Criar função update_updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 3. Tabela messages com suporte a bot
CREATE TABLE public.messages (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  sender_type text NOT NULL DEFAULT 'user' CHECK (sender_type IN ('user', 'bot', 'system')),
  sender_id text,
  room_type text NOT NULL DEFAULT 'global',
  room_id text NOT NULL DEFAULT 'main',
  content text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 4. Índices messages
CREATE INDEX idx_messages_room ON public.messages(room_type, room_id);
CREATE INDEX idx_messages_created_at ON public.messages(created_at);
CREATE INDEX idx_messages_sender_type ON public.messages(sender_type);

-- 5. RLS messages
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Políticas simples que funcionam
CREATE POLICY "messages_select_all" ON public.messages FOR SELECT USING (true);
CREATE POLICY "messages_insert_all" ON public.messages FOR INSERT WITH CHECK (true);
CREATE POLICY "messages_update_owner" ON public.messages FOR UPDATE USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
CREATE POLICY "messages_delete_owner" ON public.messages FOR DELETE USING (user_id = auth.uid());

-- 6. Trigger messages
CREATE TRIGGER update_messages_updated_at 
  BEFORE UPDATE ON public.messages 
  FOR EACH ROW 
  EXECUTE PROCEDURE update_updated_at_column();

-- 7. Tabela chat_sessions
CREATE TABLE public.chat_sessions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  room_id text NOT NULL UNIQUE,
  status text NOT NULL DEFAULT 'bot_ativo' CHECK (status IN ('bot_ativo', 'humano_solicitado', 'humano_ativo', 'inativo')),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  assigned_admin_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  last_activity_at timestamptz DEFAULT now(),
  started_at timestamptz DEFAULT now(),
  ended_at timestamptz,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 8. Índices chat_sessions
CREATE INDEX idx_chat_sessions_room_id ON public.chat_sessions(room_id);
CREATE INDEX idx_chat_sessions_status ON public.chat_sessions(status);

-- 9. RLS chat_sessions (políticas simples)
ALTER TABLE public.chat_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "chat_sessions_select_all" ON public.chat_sessions FOR SELECT USING (true);
CREATE POLICY "chat_sessions_insert_all" ON public.chat_sessions FOR INSERT WITH CHECK (true);
CREATE POLICY "chat_sessions_update_all" ON public.chat_sessions FOR UPDATE USING (true) WITH CHECK (true);

-- 10. Trigger chat_sessions
CREATE TRIGGER update_chat_sessions_updated_at 
  BEFORE UPDATE ON public.chat_sessions 
  FOR EACH ROW 
  EXECUTE PROCEDURE update_updated_at_column();

-- 11. Inserir mensagem de boas-vindas
INSERT INTO public.messages (
  sender_type,
  sender_id, 
  room_type,
  room_id,
  content
) VALUES (
  'bot',
  'bot-vrz-assistant',
  'global',
  'main',
  '👋 Olá! Sou o assistente da VRZ. Como posso ajudá-lo hoje?'
);

-- 12. Verificação final
SELECT 'Sistema criado com sucesso!' as status;