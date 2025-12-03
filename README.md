## Configuração de variáveis de ambiente

Frontend (Vite): defina no arquivo `.env` na raiz do projeto:

```
VITE_SUPABASE_URL=https://<seu-projeto>.supabase.co
VITE_SUPABASE_ANON_KEY=<chave_anon_publica>
```

Estas chaves são usadas pelo cliente do Supabase no frontend (`src/lib/supabase.ts`). Não use a `service_role` no frontend.

Edge Functions (no painel do Supabase → Project Settings → Functions → Environment Variables):

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY` (apenas servidor)
- `PIX_PROVIDER` (ex.: `mercado_pago` ou `gerencianet`)
- `PROVIDER_TOKEN` (token do provedor Pix)
- `PROVIDER_WEBHOOK_SECRET` (segredo para validar webhooks)

Verificação rápida (local):

1. Rodar `npm run dev` e checar no console se não há erro de variáveis faltando.
2. No código, importe `supabase` de `src/lib/supabase.ts` e execute uma chamada simples:

```ts
// ex.: src/pages/Login.tsx
import { supabase } from '../lib/supabase';

async function checkConnection() {
	const { data, error } = await supabase.from('profiles').select('id').limit(1);
	console.log('profiles test', { data, error });
}
```

Se `error` vier como `permission denied` é esperado: ative/aplique RLS conforme as migrações. Caso acuse variáveis ausentes, revise `.env`.

🚀 Bem-vindo ao Repositório Oficial do Estúdio VRZ 🌐

👨‍💻 Aqui, a mágica da programação acontece! 💻✨

🌟 Somos apaixonados por desenvolvimento de softwares e criação de páginas incríveis para a web.

🏢 Conheça o Estúdio VRZ - Nossa Casa de Inovação 🏢

ℹ️ Sobre Nós:

Desenvolvemos soluções de software sob medida.
Transformamos ideias em experiências digitais incríveis.
Nossa equipe é movida pela criatividade e inovação.
🔧 O que você encontrará aqui:

Código-fonte de nossos projetos.
Recursos para manutenção de nossos sites e aplicativos.
Insights sobre nosso processo criativo.
👁️‍🗨️ Fique por dentro:

Siga-nos para acompanhar nossas atualizações.
Colabore conosco para impulsionar a inovação.
💡 Juntos, moldamos o futuro digital. 💡

Junte-se a nós nesta jornada de código, criatividade e progresso! 🚀🌐👨‍💻

## Módulos Avançados (Tickets, Pagamentos, Notificações)

### Tickets
Tabela `tickets`:
```
id uuid PK
user_id uuid (dono / solicitante) ref auth.users
proposal_id uuid ref proposals
title text
description text
status text DEFAULT 'open' -- open | in_progress | resolved | closed
priority text DEFAULT 'normal' -- low | normal | high | urgent
created_at timestamptz DEFAULT now()
```
Tabela `ticket_messages` (chat por ticket):
```
id uuid PK
ticket_id uuid ref tickets
user_id uuid ref auth.users
content text
created_at timestamptz DEFAULT now()
```
RLS sugerido:
```
alter table tickets enable row level security;
alter table ticket_messages enable row level security;

create policy "select own or admin" on tickets for select using (
	auth.uid() = user_id OR exists(select 1 from profiles p where p.id = auth.uid() and p.role='admin')
);
create policy "insert self" on tickets for insert with check ( auth.uid() = user_id );
create policy "update own or admin" on tickets for update using (
	auth.uid() = user_id OR exists(select 1 from profiles p where p.id = auth.uid() and p.role='admin')
);

create policy "select ticket participants" on ticket_messages for select using (
	exists(select 1 from tickets t where t.id = ticket_id and (t.user_id = auth.uid() OR exists(select 1 from profiles p where p.id = auth.uid() and p.role='admin')))
);
create policy "insert ticket participants" on ticket_messages for insert with check (
	exists(select 1 from tickets t where t.id = ticket_id and (t.user_id = auth.uid() OR exists(select 1 from profiles p where p.id = auth.uid() and p.role='admin')))
);
```

### Pagamentos
Tabela `payments`:
```
id uuid PK
proposal_id uuid ref proposals
user_id uuid ref auth.users (proprietário ou pagador)
amount numeric(12,2)
currency text DEFAULT 'BRL'
status text DEFAULT 'pending' -- pending | processing | paid | failed | refunded | canceled
provider text -- 'pix', 'stripe_test', etc
external_reference text
metadata jsonb DEFAULT '{}'::jsonb
created_at timestamptz DEFAULT now()
updated_at timestamptz DEFAULT now()
```
Trigger para updated_at:
```
create or replace function public.touch_payments_updated_at() returns trigger as $$
begin
	new.updated_at = now();
	return new;
end;$$ language plpgsql;
create trigger trg_touch_payments before update on payments
for each row execute procedure public.touch_payments_updated_at();
```
RLS:
```
alter table payments enable row level security;
create policy "select own or admin" on payments for select using (
	auth.uid() = user_id OR exists(select 1 from profiles p where p.id = auth.uid() and p.role='admin')
);
create policy "insert own" on payments for insert with check ( auth.uid() = user_id );
create policy "update own or admin" on payments for update using (
	auth.uid() = user_id OR exists(select 1 from profiles p where p.id = auth.uid() and p.role='admin')
);
```

### Notificações
Tabela `notifications`:
```
id uuid PK
user_id uuid ref auth.users
type text -- 'proposal_status' | 'invite' | 'payment' | 'ticket_update'
message text
entity_type text -- 'proposal' | 'payment' | 'ticket'
entity_id uuid
link text -- rota interna
read boolean DEFAULT false
created_at timestamptz DEFAULT now()
```
RLS:
```
alter table notifications enable row level security;
create policy "select own" on notifications for select using ( auth.uid() = user_id );
create policy "insert own" on notifications for insert with check ( auth.uid() = user_id );
create policy "update own" on notifications for update using ( auth.uid() = user_id );
```
Envio por Edge Function (broadcast/admin): usar service role para inserir notificações destinadas a outros usuários.

### Fluxos Sugeridos
- Alteração de status da proposta -> inserir notification (proposal_status)
- Convite aceito -> notification (invite)
- Pagamento criado / confirmado -> notification (payment)
- Ticket atualizado (status ou nova mensagem) -> notification (ticket_update)

### Próximos Passos
1. Criar migrações SQL acima.
2. Implementar componentes de UI (TicketList, TicketDetail, PaymentWidget, NotificationBell).
3. Integrar hooks: `useTickets`, `usePayments`, `useNotifications` nas páginas apropriadas.
4. Email/Pix: Edge Functions para geração de QR Code Pix e webhooks de confirmação.

> Referência: hooks e providers já adicionados no diretório `src/hooks` e `src/context`.


