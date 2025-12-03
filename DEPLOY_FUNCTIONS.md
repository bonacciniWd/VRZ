# Supabase Edge Functions - Deploy Guide

## 📋 Pré-requisitos

1. **Instalar Supabase CLI**:
```bash
# Windows (via Scoop)
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase

# Ou via npm
npm install -g supabase
```

2. **Verificar instalação**:
```bash
supabase --version
```

---

## 🔐 Passo 1: Login e Link

```bash
# Login no Supabase
supabase login

# Link ao projeto (você vai precisar do Project Reference ID)
# Encontre em: Supabase Dashboard → Settings → General → Reference ID
supabase link --project-ref seu-project-ref-id
```

---

## 🌍 Passo 2: Configurar Variáveis de Ambiente

No **Supabase Dashboard**:
1. Ir em `Project Settings` → `Edge Functions` → `Manage environment variables`
2. Adicionar cada variável:

```env
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_SERVICE_ROLE_KEY=sua-service-role-key
APP_URL=http://localhost:5173

NUPAY_MERCHANT_KEY=sua-merchant-key
NUPAY_MERCHANT_TOKEN=seu-merchant-token
NUPAY_WEBHOOK_SECRET=seu-webhook-secret
NUPAY_SANDBOX=true
```

**Importante**: As variáveis de ambiente são configuradas no Dashboard, não em arquivo local!

---

## 🚀 Passo 3: Deploy das Funções

### Deploy todas de uma vez:
```bash
# Na raiz do projeto
supabase functions deploy
```

### Deploy individual (se preferir):
```bash
supabase functions deploy create-nupay-payment
supabase functions deploy nupay-webhook
supabase functions deploy check-nupay-status
```

### Ver logs em tempo real:
```bash
# Logs de uma função específica
supabase functions logs create-nupay-payment --follow

# Logs de todas as funções
supabase functions logs --follow
```

---

## 🧪 Passo 4: Testar Localmente (Opcional)

Antes de fazer deploy, você pode testar localmente:

```bash
# Iniciar servidor local do Supabase
supabase start

# Servir função específica
supabase functions serve create-nupay-payment --env-file .env.local

# Testar com curl
curl -i --location --request POST 'http://localhost:54321/functions/v1/create-nupay-payment' \
  --header 'Authorization: Bearer YOUR_ANON_KEY' \
  --header 'Content-Type: application/json' \
  --data '{"proposal_id":"uuid","amount":100,"customer":{"firstName":"Test","lastName":"User","document":"12345678900","email":"test@example.com"}}'
```

---

## 📍 Passo 5: URLs das Funções Deployed

Após deploy, as funções estarão disponíveis em:

```
https://seu-projeto.supabase.co/functions/v1/create-nupay-payment
https://seu-projeto.supabase.co/functions/v1/nupay-webhook
https://seu-projeto.supabase.co/functions/v1/check-nupay-status
```

---

## 🔄 Passo 6: Configurar Webhook no NuPay

No painel do NuPay Business:
1. Configurar URL de callback para **pagamentos**:
   ```
   https://seu-projeto.supabase.co/functions/v1/nupay-webhook
   ```

2. Configurar URL de callback para **estornos** (se necessário):
   ```
   https://seu-projeto.supabase.co/functions/v1/nupay-webhook/refunds
   ```

---

## 🔍 Verificar Deploy

```bash
# Listar funções deployadas
supabase functions list

# Ver detalhes de uma função
supabase functions describe create-nupay-payment
```

---

## 🐛 Troubleshooting

### Erro: "No linked project"
```bash
supabase link --project-ref seu-project-ref
```

### Erro: "Function not found"
Verifique estrutura de pastas:
```
supabase/
  functions/
    create-nupay-payment/
      index.ts
    nupay-webhook/
      index.ts
    check-nupay-status/
      index.ts
```

### Ver logs de erro:
```bash
supabase functions logs function-name --limit 50
```

### Redeployar após mudanças:
```bash
supabase functions deploy function-name
```

---

## 🔐 Segurança

### Chamar função do frontend:

```javascript
import { supabase } from './lib/supabase'

const { data, error } = await supabase.functions.invoke('create-nupay-payment', {
  body: {
    proposal_id: 'uuid',
    amount: 100,
    customer: {
      firstName: 'João',
      lastName: 'Silva',
      document: '12345678900',
      email: 'joao@example.com'
    }
  }
})
```

### Autenticação automática:
O Supabase Client automaticamente inclui o token JWT do usuário logado.

---

## 📊 Monitoramento

Dashboard do Supabase mostra:
- ✅ Invocações por função
- ✅ Tempo de execução
- ✅ Taxa de erro
- ✅ Logs detalhados

Acesse: `Dashboard → Edge Functions → [Nome da Função] → Logs`
