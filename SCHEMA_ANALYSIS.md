# Schema Real vs Código - Análise de Discrepâncias

## 🔍 ANÁLISE DAS TABELAS EXISTENTES

### ✅ Tabelas Confirmadas no Supabase

#### 1. **profiles**
```sql
- id (uuid, FK auth.users)
- email (text, unique)
- full_name (text)
- role (text: 'user' | 'admin')
- created_at (timestamptz)
```
**Status código**: ✅ Compatível

---

#### 2. **proposals**
```sql
- id, user_id, title, description
- amount_cents (integer) ⚠️ DIFERENTE DO CÓDIGO
- currency (text, default 'BRL')
- status (enum: rascunho, enviada, aprovada, rejeitada)
- tech_tags (text[])
- images (jsonb)
- documents (jsonb)
- invited_email, invited_user
- created_at
```

**⚠️ DISCREPÂNCIA**: 
- DB usa `amount_cents` (integer)
- Código não referencia valor monetário na proposta
- **AÇÃO**: Adicionar campo `amount` nos hooks/interfaces

---

#### 3. **project_steps**
```sql
- id, proposal_id, title, description
- step_order (integer)
- status (enum: pendente, em_andamento, concluido)
- created_at
```

**❌ DISCREPÂNCIA CRÍTICA**:
- Tabela existe no DB
- Hook `useProjectSteps` NÃO EXISTE no código
- UI não implementada
- **AÇÃO**: Criar hook e componentes

---

#### 4. **tickets**
```sql
- id, user_id, proposal_id
- subject (⚠️ no código usa 'title')
- body (⚠️ no código usa 'description')
- status (enum: aberto, em_andamento, resolvido, fechado)
- priority (enum: baixa, media, alta, urgente)
- created_by, assigned_to (novos campos!)
- created_at
```

**⚠️ DISCREPÂNCIAS**:
- DB: `subject/body` vs Código: `title/description`
- DB tem `created_by` e `assigned_to` (não usado no código)
- Status enum português no DB vs inglês no código
- **AÇÃO**: Atualizar hook para usar campos corretos

---

#### 5. **messages**
```sql
- id, user_id, room_type, room_id
- proposal_id (novo!)
- ticket_id (novo!)
- content
- attachments (jsonb) (novo!)
- metadata (jsonb) (novo!)
- created_at, edited_at
```

**⚠️ DISCREPÂNCIAS**:
- DB tem `proposal_id` e `ticket_id` (não usado no código)
- DB tem `attachments` (não implementado)
- DB tem `edited_at` (edit não implementado)
- Código tem `updated_at` mas DB tem `edited_at`
- **AÇÃO**: Aproveitar campos para integração chat-tickets-proposals

---

#### 6. **payments**
```sql
- id, proposal_id, provider, external_id
- amount_cents (integer)
- status (enum: pendente, processando, pago, falhou, reembolsado, cancelado)
- pix_qr_code, pix_qr_code_base64
- due_date
- raw (jsonb) - armazenar resposta do provider
- created_at
```

**⚠️ DISCREPÂNCIAS**:
- DB não tem `user_id` (usa `proposal_id` apenas)
- DB não tem `currency` (assumir BRL)
- DB tem campos Pix prontos (qr_code, qr_code_base64)
- Hook espera `currency` mas DB não tem
- Status enum português no DB vs inglês no código
- **AÇÃO**: Ajustar hook para schema real

---

#### 7. **notifications**
```sql
- id, user_id, type (enum)
- payload (jsonb) - flexível!
- read_at (timestamptz, null = não lido)
- created_at
```

**⚠️ DISCREPÂNCIAS**:
- DB usa `read_at` vs Código usa `read` (boolean)
- DB usa `payload` (jsonb) vs Código usa múltiplos campos separados
- **AÇÃO**: Atualizar hook para usar payload

---

## 🚨 AÇÕES NECESSÁRIAS - PRIORIDADES

### 🔴 PRIORIDADE ALTA - Corrigir Incompatibilidades

#### 1. Atualizar `useTickets.js`
```diff
- title → subject
- description → body
- status: 'open' → 'aberto'
- adicionar created_by, assigned_to
```

#### 2. Atualizar `usePayments.js`
```diff
- remover user_id (usar proposal_id apenas)
- remover currency (assumir BRL)
- amount → amount_cents (converter)
- adicionar pix_qr_code, pix_qr_code_base64
- status: 'pending' → 'pendente'
```

#### 3. Atualizar `useMessages.js`
```diff
- adicionar suporte a proposal_id, ticket_id
- adicionar attachments
- adicionar edit functionality (edited_at)
- updated_at → edited_at
```

#### 4. Atualizar `useNotifications.js`
```diff
- read (boolean) → read_at (timestamp)
- campos separados → payload (jsonb)
```

---

### 🟡 PRIORIDADE MÉDIA - Implementar Faltantes

#### 5. Criar `useProjectSteps.js`
Hook completo para gerenciar etapas do projeto:
```javascript
- fetchSteps(proposalId)
- createStep(proposalId, {title, description, step_order})
- updateStep(id, {title, description, status})
- reorderSteps(proposalId, newOrder[])
- deleteStep(id)
```

#### 6. Adicionar `amount_cents` em proposals
- UI para definir valor na criação
- Exibir valor formatado nas visualizações
- Converter entre centavos e reais

---

### 🟢 PRIORIDADE BAIXA - Melhorias

#### 7. Implementar edição de mensagens
- UI para editar mensagem
- Mostrar indicador "editado"
- Usar `edited_at`

#### 8. Implementar anexos em mensagens
- Upload de arquivos
- Preview de imagens
- Download de documentos

#### 9. Integração chat-tickets-proposals
- Vincular mensagens a tickets
- Vincular mensagens a propostas
- Navegação contextual

---

## 📝 MAPEAMENTO DE ENUMS

### Proposals Status
```typescript
DB: 'rascunho' | 'enviada' | 'aprovada' | 'rejeitada'
Código: 'draft' | 'sent' | 'approved' | 'rejected'
```
**AÇÃO**: Manter código em inglês, mapear ao salvar/carregar

### Tickets Status
```typescript
DB: 'aberto' | 'em_andamento' | 'resolvido' | 'fechado'
Código: 'open' | 'in_progress' | 'resolved' | 'closed'
```
**AÇÃO**: Manter código em inglês, mapear ao salvar/carregar

### Tickets Priority
```typescript
DB: 'baixa' | 'media' | 'alta' | 'urgente'
Código: 'low' | 'normal' | 'high' | 'urgent'
```
**AÇÃO**: Manter código em inglês, mapear ao salvar/carregar

### Payments Status
```typescript
DB: 'pendente' | 'processando' | 'pago' | 'falhou' | 'reembolsado' | 'cancelado'
Código: 'pending' | 'processing' | 'paid' | 'failed' | 'refunded' | 'canceled'
```
**AÇÃO**: Manter código em inglês, mapear ao salvar/carregar

### Steps Status
```typescript
DB: 'pendente' | 'em_andamento' | 'concluido'
Código: (não existe ainda)
Sugestão: 'pending' | 'in_progress' | 'completed'
```

---

## 🔧 ARQUIVOS A MODIFICAR

### Hooks a Atualizar
1. ✅ `src/hooks/useTickets.js` - Ajustar campos e enums
2. ✅ `src/hooks/usePayments.js` - Ajustar schema
3. ✅ `src/hooks/useMessages.js` - Adicionar campos novos
4. ✅ `src/hooks/useNotifications.js` - Mudar para payload
5. ❌ `src/hooks/useProjectSteps.js` - CRIAR DO ZERO
6. ⚠️ `src/hooks/useProposals.js` - Adicionar amount_cents

### Utils a Criar
7. ❌ `src/utils/enumMapping.js` - Mapear PT ↔ EN
8. ❌ `src/utils/currency.js` - Já existe, adicionar centavos

### Componentes a Criar/Atualizar
9. ❌ `src/components/ProjectSteps/` - Nova pasta
10. ⚠️ Atualizar forms para incluir valores monetários

---

## 🎯 PLANO DE AÇÃO IMEDIATO

### Fase 1: Corrigir Incompatibilidades (2-3 horas)
1. Criar `enumMapping.js` com traduções
2. Atualizar `useTickets.js` com campos corretos
3. Atualizar `usePayments.js` com schema real
4. Atualizar `useMessages.js` com novos campos
5. Atualizar `useNotifications.js` para payload

### Fase 2: Implementar Project Steps (4-6 horas)
1. Criar `useProjectSteps.js`
2. Criar componentes UI (admin e user)
3. Integrar na página de proposta

### Fase 3: Adicionar Valores Monetários (2-3 horas)
1. Adicionar input de valor em ProposalForm
2. Exibir valor nas listagens
3. Validações e formatação

### Fase 4: Features Avançadas (opcional)
1. Edição de mensagens
2. Anexos em mensagens
3. Integração chat-tickets-proposals

---

## 💡 DECISÕES DE DESIGN

### Enums: Português no DB, Inglês no Código
**Justificativa**: 
- DB em português facilita queries diretas e relatórios
- Código em inglês segue convenção internacional
- Mapeamento bidirecional resolve ambos

### Valores Monetários: Sempre em Centavos
**Justificativa**:
- Evita problemas de precisão com floats
- Padrão da indústria (Stripe, etc)
- Converter apenas na UI

### Payload JSON para Notifications
**Justificativa**:
- Flexibilidade para diferentes tipos
- Não precisa alterar schema para novos campos
- Facilita serialização

---

## ✅ CHECKLIST DE COMPATIBILIDADE

- [ ] Tickets: campos subject/body mapeados
- [ ] Tickets: enums português ↔ inglês
- [ ] Tickets: created_by/assigned_to implementados
- [ ] Payments: amount_cents vs amount
- [ ] Payments: removed user_id dependency
- [ ] Payments: Pix fields utilizados
- [ ] Messages: proposal_id/ticket_id suportados
- [ ] Messages: attachments implementado
- [ ] Messages: edited_at vs updated_at
- [ ] Notifications: read_at vs read
- [ ] Notifications: payload vs campos separados
- [ ] ProjectSteps: hook criado
- [ ] ProjectSteps: UI implementada
- [ ] Proposals: amount_cents adicionado
- [ ] EnumMapping: utility criada

---

**Próximo passo**: Começar pela Fase 1 (corrigir incompatibilidades)
