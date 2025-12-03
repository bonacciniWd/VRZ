# NuPay Business Integration - Edge Functions

## 🚀 Funções Implementadas

### 1. **create-nupay-payment**
Cria um novo pagamento via NuPay Business (2FA - autenticação manual no app)

**Endpoint**: `POST /functions/v1/create-nupay-payment`

**Request Body**:
```json
{
  "proposal_id": "uuid",
  "amount": 150.50,
  "customer": {
    "firstName": "João",
    "lastName": "Silva",
    "document": "12345678900",
    "email": "joao@example.com",
    "phone": "11999999999"
  },
  "returnUrl": "https://seusite.com/pagamento/sucesso",
  "cancelUrl": "https://seusite.com/pagamento/cancelar"
}
```

**Response**:
```json
{
  "success": true,
  "payment": {
    "id": "payment-uuid",
    "external_id": "nupay-psp-reference-id",
    "reference_id": "internal-reference",
    "status": "WAITING_PAYMENT_METHOD",
    "payment_url": "https://nuapp.nubank.com.br/...",
    "amount_cents": 15050
  },
  "message": "Payment created successfully. Redirect customer to payment_url."
}
```

**Fluxo**:
1. Valida proposta existe
2. Cria pagamento na API NuPay
3. Salva no banco de dados com status 'pendente'
4. Retorna URL para redirecionar cliente ao app Nubank
5. Cliente autoriza no app → webhook atualiza status

---

### 2. **nupay-webhook**
Recebe notificações de mudança de status do NuPay

**Endpoint**: `POST /functions/v1/nupay-webhook`
- Pagamentos: `/functions/v1/nupay-webhook`
- Estornos: `/functions/v1/nupay-webhook/refunds`

**Headers**:
- `X-Spin-Signature`: HMAC-SHA256 assinatura
- `X-Spin-Timestamp`: Timestamp da requisição

**Webhook Payload (Payment)**:
```json
{
  "referenceId": "internal-reference",
  "pspReferenceId": "nupay-psp-id",
  "timestamp": "2023-07-01T10:10:20.512Z",
  "paymentMethodType": "nupay"
}
```

**Fluxo**:
1. Verifica assinatura HMAC (segurança crítica)
2. Consulta status detalhado na API NuPay
3. Atualiza payment no banco
4. Se status = COMPLETED:
   - Atualiza proposal → 'aprovada'
   - Cria notificação para usuário
5. Sempre retorna 200 OK

---

### 3. **check-nupay-status**
Consulta status atual de um pagamento (polling manual)

**Endpoint**: `POST /functions/v1/check-nupay-status`

**Request Body**:
```json
{
  "payment_id": "payment-uuid"
}
```

**Response**:
```json
{
  "success": true,
  "payment": {
    "id": "payment-uuid",
    "status": "pago",
    "external_id": "nupay-psp-id",
    "nupay_status": "COMPLETED",
    "amount": {
      "value": 150.50,
      "currency": "BRL"
    },
    "timestamp": "2023-07-01T10:10:20.512Z",
    "payer": {
      "id": "payer-uuid"
    }
  },
  "status_changed": true
}
```

**Uso**: Polling a cada 5-10s enquanto status = 'pendente'

---

## 🔐 Configuração

### 1. Variáveis de Ambiente

Adicione no Supabase Dashboard → Settings → Edge Functions:

```bash
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_SERVICE_ROLE_KEY=sua-service-role-key
APP_URL=https://seusite.com

# NuPay Credentials (obter em merchant.nupaybusiness.com.br)
NUPAY_MERCHANT_KEY=sua-merchant-key
NUPAY_MERCHANT_TOKEN=seu-merchant-token
NUPAY_WEBHOOK_SECRET=seu-webhook-secret

# Ambiente
NUPAY_SANDBOX=true  # false para produção
```

### 2. Configurar Webhook URL no NuPay

No painel NuPay, configure a URL de callback:
```
https://seu-projeto.supabase.co/functions/v1/nupay-webhook
```

Para estornos:
```
https://seu-projeto.supabase.co/functions/v1/nupay-webhook/refunds
```

---

## 🧪 Deploy das Funções

```bash
# Login no Supabase
supabase login

# Link ao projeto
supabase link --project-ref seu-projeto-ref

# Deploy individual
supabase functions deploy create-nupay-payment
supabase functions deploy nupay-webhook
supabase functions deploy check-nupay-status

# Deploy todas de uma vez
supabase functions deploy
```

---

## 📊 Mapeamento de Status

| NuPay Status | DB Status (PT) | Descrição |
|--------------|----------------|-----------|
| WAITING_PAYMENT_METHOD | pendente | Aguardando autorização do cliente |
| AUTHORIZED | processando | Autorizado mas não liquidado |
| COMPLETED | pago | Pagamento concluído ✅ |
| CANCELLED | cancelado | Cancelado pelo cliente/timeout |
| ERROR | falhou | Erro no processamento |

---

## 🔄 Fluxo Completo

```
1. Frontend chama create-nupay-payment
   ↓
2. Edge Function cria pagamento na API NuPay
   ↓
3. Salva payment no DB com status 'pendente'
   ↓
4. Retorna payment_url para frontend
   ↓
5. Frontend redireciona usuário ao app Nubank
   ↓
6. Usuário autoriza pagamento no app
   ↓
7. NuPay envia webhook para nupay-webhook
   ↓
8. Webhook verifica assinatura e atualiza DB
   ↓
9. Se COMPLETED:
   - Proposal → 'aprovada'
   - Notificação criada
   ↓
10. Frontend recebe atualização via realtime subscription
```

---

## ⚠️ Segurança

### Webhook Signature Verification

A verificação de assinatura é **CRÍTICA**:

```typescript
// NuPay usa HMAC-SHA256(timestamp + body, webhook_secret)
const payload = timestamp + body
const hmac = createHmac('sha256', webhookSecret)
hmac.update(payload)
const expectedSignature = hmac.digest('base64')

if (signature !== expectedSignature) {
  return 401 // Reject
}
```

**NUNCA** processe webhooks sem verificar a assinatura!

---

## 🧩 Integração Frontend

Ver documentação em `/src/hooks/usePayments.js` para:
- `createNuPayPayment(proposalId, amount, customer)`
- `checkPaymentStatus(paymentId)`
- Realtime subscription para atualizações automáticas

---

## 📚 Referências

- [NuPay Business API Docs](https://docs.nupaybusiness.com.br/checkout/docs/openapi/)
- [Supabase Edge Functions](https://supabase.com/docs/guides/functions)
- [HMAC Authentication](https://en.wikipedia.org/wiki/HMAC)
