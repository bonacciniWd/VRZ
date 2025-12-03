import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { createHmac } from 'https://deno.land/std@0.168.0/node/crypto.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-spin-signature, x-spin-timestamp',
}

interface NuPayWebhookPayload {
  referenceId: string
  pspReferenceId: string
  timestamp: string
  paymentMethodType: string
}

interface RefundWebhookPayload {
  referenceId: string
  refundId: string
  pspReferenceId: string
  transactionRefundId: string
  timestamp: string
}

/**
 * Verify webhook signature from NuPay
 * X-Spin-Signature: HMAC-SHA256 of request body using merchant secret
 */
function verifySignature(body: string, signature: string, timestamp: string, secret: string): boolean {
  try {
    // NuPay uses HMAC-SHA256(timestamp + body, secret)
    const payload = timestamp + body
    const hmac = createHmac('sha256', secret)
    hmac.update(payload)
    const expectedSignature = hmac.digest('base64')
    
    return signature === expectedSignature
  } catch (error) {
    console.error('Signature verification error:', error)
    return false
  }
}

/**
 * Map NuPay status to internal status (Portuguese enum)
 */
function mapNuPayStatus(nupayStatus: string): string {
  const statusMap: Record<string, string> = {
    'WAITING_PAYMENT_METHOD': 'pendente',
    'AUTHORIZED': 'processando',
    'COMPLETED': 'pago',
    'CANCELLED': 'cancelado',
    'ERROR': 'falhou',
  }
  return statusMap[nupayStatus] || 'pendente'
}

/**
 * Create notification for user
 */
async function createNotification(
  supabaseClient: any,
  userId: string,
  type: string,
  payload: any
) {
  try {
    await supabaseClient
      .from('notifications')
      .insert({
        user_id: userId,
        type,
        payload,
      })
    console.log(`✅ Notification created: ${type} for user ${userId}`)
  } catch (error) {
    console.error('Failed to create notification:', error)
  }
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const signature = req.headers.get('X-Spin-Signature') || ''
    const timestamp = req.headers.get('X-Spin-Timestamp') || ''
    const body = await req.text()

    // 1. Verify webhook signature (CRITICAL for security)
    const webhookSecret = Deno.env.get('NUPAY_WEBHOOK_SECRET') ?? ''
    if (!verifySignature(body, signature, timestamp, webhookSecret)) {
      console.error('❌ Invalid webhook signature')
      return new Response(
        JSON.stringify({ error: 'Invalid signature' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 401,
        }
      )
    }

    console.log('✅ Webhook signature verified')

    // 2. Parse payload
    const isRefund = req.url.includes('/refunds')
    const payload = JSON.parse(body)

    if (isRefund) {
      // Handle refund webhook
      const refundPayload = payload as RefundWebhookPayload
      console.log('📦 Refund webhook received:', refundPayload)

      // Find payment by external_id
      const { data: payment } = await supabaseClient
        .from('payments')
        .select('id, proposal_id, user_id')
        .eq('external_id', refundPayload.pspReferenceId)
        .single()

      if (!payment) {
        console.error('Payment not found for refund:', refundPayload.pspReferenceId)
        return new Response('ok', { headers: corsHeaders, status: 200 })
      }

      // Query refund status from NuPay
      const nupayApiUrl = Deno.env.get('NUPAY_SANDBOX') === 'true'
        ? `https://sandbox-api.spinpay.com.br/v1/checkouts/payments/${refundPayload.pspReferenceId}/refunds/${refundPayload.refundId}`
        : `https://api.spinpay.com.br/v1/checkouts/payments/${refundPayload.pspReferenceId}/refunds/${refundPayload.refundId}`

      const refundResponse = await fetch(nupayApiUrl, {
        headers: {
          'X-Merchant-Key': Deno.env.get('NUPAY_MERCHANT_KEY') ?? '',
          'X-Merchant-Token': Deno.env.get('NUPAY_MERCHANT_TOKEN') ?? '',
        },
      })

      const refundData = await refundResponse.json()

      // Update payment status if refunded
      if (refundData.status === 'REFUNDED') {
        await supabaseClient
          .from('payments')
          .update({
            status: 'reembolsado',
            raw: refundData,
          })
          .eq('id', payment.id)

        // Get proposal user_id
        const { data: proposal } = await supabaseClient
          .from('proposals')
          .select('user_id')
          .eq('id', payment.proposal_id)
          .single()

        if (proposal) {
          await createNotification(
            supabaseClient,
            proposal.user_id,
            'pagamento_reembolsado',
            {
              message: 'Seu pagamento foi reembolsado',
              entity_type: 'payment',
              entity_id: payment.id,
              link: `/payments/${payment.id}`,
            }
          )
        }
      }

      return new Response('ok', { headers: corsHeaders, status: 200 })
    }

    // 3. Handle payment status webhook
    const webhookPayload = payload as NuPayWebhookPayload
    console.log('📦 Payment webhook received:', webhookPayload)

    // 4. Find payment by external_id
    const { data: payment, error: findError } = await supabaseClient
      .from('payments')
      .select('id, proposal_id, status')
      .eq('external_id', webhookPayload.pspReferenceId)
      .single()

    if (findError || !payment) {
      console.error('Payment not found:', webhookPayload.pspReferenceId)
      return new Response('ok', { headers: corsHeaders, status: 200 })
    }

    console.log('💳 Payment found:', payment.id)

    // 5. Query detailed payment status from NuPay API
    const nupayApiUrl = Deno.env.get('NUPAY_SANDBOX') === 'true'
      ? `https://sandbox-api.spinpay.com.br/v1/checkouts/payments/${webhookPayload.pspReferenceId}/status`
      : `https://api.spinpay.com.br/v1/checkouts/payments/${webhookPayload.pspReferenceId}/status`

    const statusResponse = await fetch(nupayApiUrl, {
      headers: {
        'X-Merchant-Key': Deno.env.get('NUPAY_MERCHANT_KEY') ?? '',
        'X-Merchant-Token': Deno.env.get('NUPAY_MERCHANT_TOKEN') ?? '',
      },
    })

    if (!statusResponse.ok) {
      console.error('Failed to fetch payment status from NuPay')
      return new Response('ok', { headers: corsHeaders, status: 200 })
    }

    const statusData = await statusResponse.json()
    console.log('📊 Payment status from NuPay:', statusData.status)

    // 6. Map NuPay status to internal status
    const newStatus = mapNuPayStatus(statusData.status)

    // 7. Update payment in database
    const { error: updateError } = await supabaseClient
      .from('payments')
      .update({
        status: newStatus,
        raw: statusData,
      })
      .eq('id', payment.id)

    if (updateError) {
      console.error('Failed to update payment:', updateError)
      return new Response('ok', { headers: corsHeaders, status: 200 })
    }

    console.log(`✅ Payment ${payment.id} updated to status: ${newStatus}`)

    // 8. Handle status-specific actions
    if (statusData.status === 'COMPLETED') {
      // Payment completed - update proposal status
      await supabaseClient
        .from('proposals')
        .update({ status: 'aprovada' })
        .eq('id', payment.proposal_id)

      // Get proposal user_id for notification
      const { data: proposal } = await supabaseClient
        .from('proposals')
        .select('user_id, title')
        .eq('id', payment.proposal_id)
        .single()

      if (proposal) {
        await createNotification(
          supabaseClient,
          proposal.user_id,
          'pagamento_confirmado',
          {
            message: `Pagamento confirmado para "${proposal.title}"`,
            entity_type: 'payment',
            entity_id: payment.id,
            link: `/proposals/${payment.proposal_id}`,
          }
        )
      }

      console.log('✅ Proposal approved and notification sent')
    } else if (statusData.status === 'CANCELLED' || statusData.status === 'ERROR') {
      // Payment failed/cancelled
      const { data: proposal } = await supabaseClient
        .from('proposals')
        .select('user_id, title')
        .eq('id', payment.proposal_id)
        .single()

      if (proposal) {
        await createNotification(
          supabaseClient,
          proposal.user_id,
          'pagamento_falhou',
          {
            message: `Pagamento ${statusData.status === 'CANCELLED' ? 'cancelado' : 'falhou'} para "${proposal.title}"`,
            entity_type: 'payment',
            entity_id: payment.id,
            link: `/payments/${payment.id}`,
          }
        )
      }
    }

    return new Response('ok', { headers: corsHeaders, status: 200 })
  } catch (error) {
    console.error('Webhook error:', error)
    // Always return 200 to prevent NuPay from retrying
    return new Response('ok', { headers: corsHeaders, status: 200 })
  }
})
