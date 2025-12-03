import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface CreatePaymentRequest {
  proposal_id: string
  amount: number // in BRL (will be converted to cents)
  customer: {
    firstName: string
    lastName: string
    document: string // CPF
    email: string
    phone?: string
  }
  returnUrl?: string
  cancelUrl?: string
}

interface NuPayCheckoutRequest {
  merchantOrderReference: string
  referenceId: string
  amount: {
    value: number
    currency: string
  }
  shopper: {
    reference: string
    firstName: string
    lastName: string
    document: string
    documentType: string
    email: string
    phone?: {
      countryCode: string
      number: string
    }
    locale: string
  }
  paymentMethod: {
    type: string
    authorizationType: string
  }
  paymentFlow?: {
    returnUrl: string
    cancelUrl: string
  }
  items: Array<{
    id: string
    name: string
    quantity: number
    unitPrice: number
  }>
  delayToAutoCancel?: number
  callbackUrl: string
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

    const { proposal_id, amount, customer, returnUrl, cancelUrl } = await req.json() as CreatePaymentRequest

    // 1. Validate proposal exists
    const { data: proposal, error: proposalError } = await supabaseClient
      .from('proposals')
      .select('id, title, user_id, amount_cents')
      .eq('id', proposal_id)
      .single()

    if (proposalError || !proposal) {
      throw new Error('Proposal not found')
    }

    // 2. Generate unique reference ID
    const referenceId = crypto.randomUUID()
    const merchantOrderReference = `PROP-${proposal_id.slice(0, 8)}-${Date.now()}`

    // 3. Build NuPay API request
    const nupayRequest: NuPayCheckoutRequest = {
      merchantOrderReference,
      referenceId,
      amount: {
        value: amount,
        currency: 'BRL',
      },
      shopper: {
        reference: customer.document,
        firstName: customer.firstName,
        lastName: customer.lastName,
        document: customer.document,
        documentType: 'CPF',
        email: customer.email,
        locale: 'pt-BR',
      },
      paymentMethod: {
        type: 'nupay',
        authorizationType: 'manually_authorized', // 2FA - user authorizes in app
      },
      items: [
        {
          id: proposal_id,
          name: proposal.title || 'Proposta',
          quantity: 1,
          unitPrice: amount,
        },
      ],
      delayToAutoCancel: 30, // 30 minutes to complete payment
      callbackUrl: `${Deno.env.get('SUPABASE_URL')}/functions/v1/nupay-webhook`,
    }

    // Add phone if provided
    if (customer.phone) {
      nupayRequest.shopper.phone = {
        countryCode: '+55',
        number: customer.phone.replace(/\D/g, ''),
      }
    }

    // Add return/cancel URLs if provided
    if (returnUrl || cancelUrl) {
      nupayRequest.paymentFlow = {
        returnUrl: returnUrl || `${Deno.env.get('APP_URL')}/payments/success`,
        cancelUrl: cancelUrl || `${Deno.env.get('APP_URL')}/payments/cancel`,
      }
    }

    // 4. Call NuPay API
    const nupayApiUrl = Deno.env.get('NUPAY_SANDBOX') === 'true'
      ? 'https://sandbox-api.spinpay.com.br/v1/checkouts/payments'
      : 'https://api.spinpay.com.br/v1/checkouts/payments'

    const nupayResponse = await fetch(nupayApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Merchant-Key': Deno.env.get('NUPAY_MERCHANT_KEY') ?? '',
        'X-Merchant-Token': Deno.env.get('NUPAY_MERCHANT_TOKEN') ?? '',
      },
      body: JSON.stringify(nupayRequest),
    })

    if (!nupayResponse.ok) {
      const errorData = await nupayResponse.json()
      console.error('NuPay API Error:', errorData)
      throw new Error(`NuPay API Error: ${errorData.message || 'Unknown error'}`)
    }

    const nupayData = await nupayResponse.json()

    // 5. Create payment record in database
    const { data: payment, error: paymentError } = await supabaseClient
      .from('payments')
      .insert({
        proposal_id,
        provider: 'nupay',
        external_id: nupayData.pspReferenceId,
        amount_cents: Math.round(amount * 100),
        status: nupayData.status === 'WAITING_PAYMENT_METHOD' ? 'pendente' : 'processando',
        raw: nupayData,
      })
      .select()
      .single()

    if (paymentError) {
      console.error('Database Error:', paymentError)
      throw new Error('Failed to create payment record')
    }

    // 6. Return payment info with URL
    return new Response(
      JSON.stringify({
        success: true,
        payment: {
          id: payment.id,
          external_id: nupayData.pspReferenceId,
          reference_id: referenceId,
          status: nupayData.status,
          payment_url: nupayData.paymentUrl,
          amount_cents: payment.amount_cents,
        },
        message: 'Payment created successfully. Redirect customer to payment_url.',
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
