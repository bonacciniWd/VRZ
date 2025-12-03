import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

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

    const { payment_id } = await req.json()

    if (!payment_id) {
      throw new Error('payment_id is required')
    }

    // 1. Get payment from database
    const { data: payment, error: paymentError } = await supabaseClient
      .from('payments')
      .select('id, external_id, status, proposal_id')
      .eq('id', payment_id)
      .single()

    if (paymentError || !payment) {
      throw new Error('Payment not found')
    }

    // If payment is already completed or cancelled, no need to check
    if (['pago', 'cancelado', 'reembolsado'].includes(payment.status)) {
      return new Response(
        JSON.stringify({
          success: true,
          payment: {
            id: payment.id,
            status: payment.status,
            external_id: payment.external_id,
          },
          message: 'Payment status is final',
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      )
    }

    // 2. Query NuPay API for current status
    const nupayApiUrl = Deno.env.get('NUPAY_SANDBOX') === 'true'
      ? `https://sandbox-api.spinpay.com.br/v1/checkouts/payments/${payment.external_id}/status`
      : `https://api.spinpay.com.br/v1/checkouts/payments/${payment.external_id}/status`

    const nupayResponse = await fetch(nupayApiUrl, {
      headers: {
        'X-Merchant-Key': Deno.env.get('NUPAY_MERCHANT_KEY') ?? '',
        'X-Merchant-Token': Deno.env.get('NUPAY_MERCHANT_TOKEN') ?? '',
        'Content-Type': 'application/json',
      },
    })

    if (!nupayResponse.ok) {
      const errorData = await nupayResponse.json()
      console.error('NuPay API Error:', errorData)
      throw new Error(`NuPay API Error: ${errorData.message || 'Unknown error'}`)
    }

    const nupayData = await nupayResponse.json()

    // 3. Map NuPay status to internal status
    const newStatus = mapNuPayStatus(nupayData.status)

    // 4. Update payment if status changed
    if (newStatus !== payment.status) {
      const { error: updateError } = await supabaseClient
        .from('payments')
        .update({
          status: newStatus,
          raw: nupayData,
        })
        .eq('id', payment.id)

      if (updateError) {
        console.error('Failed to update payment:', updateError)
      }

      // 5. If payment completed, update proposal
      if (nupayData.status === 'COMPLETED') {
        await supabaseClient
          .from('proposals')
          .update({ status: 'aprovada' })
          .eq('id', payment.proposal_id)

        // Create notification
        const { data: proposal } = await supabaseClient
          .from('proposals')
          .select('user_id, title')
          .eq('id', payment.proposal_id)
          .single()

        if (proposal) {
          await supabaseClient
            .from('notifications')
            .insert({
              user_id: proposal.user_id,
              type: 'pagamento_confirmado',
              payload: {
                message: `Pagamento confirmado para "${proposal.title}"`,
                entity_type: 'payment',
                entity_id: payment.id,
                link: `/proposals/${payment.proposal_id}`,
              },
            })
        }
      }
    }

    // 6. Return updated status
    return new Response(
      JSON.stringify({
        success: true,
        payment: {
          id: payment.id,
          status: newStatus,
          external_id: payment.external_id,
          nupay_status: nupayData.status,
          amount: nupayData.amount,
          timestamp: nupayData.timestamp,
          payer: nupayData.payer,
        },
        status_changed: newStatus !== payment.status,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})
