// Edge Function exemplo para gerar magic link e enviar e-mail de convite.
// Necessita variáveis de ambiente SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY.
// Deploy com: supabase functions deploy invite-user --project-ref <ref>
// Atenção: Função roda em Deno.

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const supabase = createClient(SUPABASE_URL, SERVICE_KEY)

serve(async (req: Request) => {
  try {
    if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 })
    const { email, proposalId } = await req.json()
    if (!email) return new Response(JSON.stringify({ error: 'Email obrigatório' }), { status: 400 })

    // Checa se já existe profile (ajuste conforme schema real)
    const { data: profiles } = await supabase.from('profiles').select('id').eq('email', email).limit(1)
    const exists = profiles && profiles.length > 0
    if (exists) {
      // opcional: inserir notificação
      await supabase.from('notifications').insert({ user_id: profiles[0].id, type: 'proposal_invite', proposal_id: proposalId })
      return new Response(JSON.stringify({ message: 'Usuário existente notificado' }), { status: 200 })
    }

    // Gera magic link
    const { data: linkData, error: linkErr } = await supabase.auth.admin.generateLink({ type: 'magiclink', email })
    if (linkErr) throw linkErr

    // Envia e-mail simples via integração externa ou SMTP (placeholder)
    // Aqui apenas retorna o link (em produção usar API de e-mail: Resend, Sendgrid, Postmark, etc.)
    return new Response(JSON.stringify({ message: 'Magic link gerado', link: linkData }), { status: 200 })
  } catch (e) {
    console.error(e)
    return new Response(JSON.stringify({ error: e.message }), { status: 500 })
  }
})
