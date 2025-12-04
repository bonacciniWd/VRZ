import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProposal } from '../../hooks/useProposal.js';
import { usePayments } from '../../hooks/usePayments.js';
import { formatCurrency, SUPPORTED_CURRENCIES } from '../../utils/currency.js';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card.jsx';
import { Badge } from '../../components/ui/badge.jsx';
import Button from '../../components/ui/button.jsx';
import { Input } from '../../components/ui/input.jsx';

import { FileText, Download } from 'lucide-react';

const ProposalPage = () => {
  const { id } = useParams();
  const { proposal, loading, error, refresh } = useProposal(id);
  const { payments, createPayment, loading: loadingPayments } = usePayments({ proposalId: id });
  const [currency, setCurrency] = useState('BRL');
  const [creatingPay, setCreatingPay] = useState(false);
  const [selectedInstallments, setSelectedInstallments] = useState(1);

  async function handleCreatePayment() {
    if (!proposal || !proposal.amount) return;
    setCreatingPay(true);
    try {
      // Divide o valor total pelo número de parcelas selecionado
      const parcela = Number(proposal.amount) / selectedInstallments;
      await createPayment({ proposal_id: id, amount: parcela, currency, installments: selectedInstallments });
    } catch (e) { console.error(e); } finally { setCreatingPay(false); }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Proposta</CardTitle>
        </CardHeader>
        <CardContent>
          {loading && <p className="text-sm opacity-70">Carregando...</p>}
          {error && <p className="text-sm text-red-400">Erro: {error}</p>}
          {!loading && !proposal && !error && <p className="text-sm opacity-70">Não encontrada ou sem permissão.</p>}
          {proposal && (
            <div className="space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant={proposal.status === 'approved' ? 'success' : proposal.status === 'sent' ? 'outline' : 'default'}>{proposal.status}</Badge>
                {proposal.invited_email && (
                  <Badge variant="outline">Convidado: {proposal.invited_email}</Badge>
                )}
                <Button variant="outline" className="text-xs h-auto px-2 py-1" onClick={refresh}>Atualizar</Button>
              </div>
              <h2 className="text-lg font-semibold tracking-tight">{proposal.title}</h2>
              {proposal.description && <p className="text-sm leading-relaxed opacity-90 whitespace-pre-line">{proposal.description}</p>}
              {proposal.tech_tags && proposal.tech_tags.length > 0 && (
                <div>
                  <p className="text-xs mb-2 opacity-70">Tecnologias:</p>
                  <div className="flex flex-wrap gap-2">
                    {proposal.tech_tags.map(t => <Badge key={t} variant="outline" className="text-[11px]">{t}</Badge>)}
                  </div>
                </div>
              )}
              {proposal.images && proposal.images.length > 0 && (
                <div>
                  <p className="text-xs mb-2 opacity-70">Imagens:</p>
                  <div className="flex gap-3 overflow-x-auto py-1">
                    {proposal.images.map(img => (
                      <a key={img} href={img} target="_blank" rel="noreferrer">
                        <img src={img} alt="img" className="h-32 w-32 object-cover rounded border border-white/10 hover:border-verde-vr transition-colors" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
              {proposal.documents && proposal.documents.length > 0 && (
                <div>
                  <p className="text-xs mb-2 opacity-70">Documentos PDF:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {proposal.documents.map((doc, idx) => {
                      const fileName = doc.split('/').pop().split('?')[0].split('-').slice(2).join('-') || `Documento ${idx + 1}`;
                      return (
                        <a 
                          key={idx} 
                          href={doc} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="flex items-center gap-3 p-2 rounded-md bg-slate-800/50 border border-white/5 hover:bg-slate-800 hover:border-verde-vr/50 transition-all group"
                        >
                          <div className="p-2 rounded bg-slate-900 text-verde-vr">
                            <FileText className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-slate-300 truncate group-hover:text-white">{fileName}</p>
                            <p className="text-[10px] text-slate-500">PDF</p>
                          </div>
                          <Download className="w-3 h-3 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}
              <div className="border-t border-white/10 pt-4">
                <h3 className="text-sm font-semibold mb-2">Pagamentos</h3>
                {loadingPayments && <p className="text-xs opacity-70">Carregando pagamentos...</p>}
                {!loadingPayments && payments.length === 0 && <p className="text-xs opacity-60">Nenhum pagamento.</p>}
                <ul className="space-y-2 mb-4">
                  {payments.map(pay => (
                    <li key={pay.id} className="text-xs flex items-center justify-between bg-slate-800/60 rounded px-3 py-2">
                      <span>{formatCurrency(pay.amount, pay.currency)} <span className="opacity-50">({pay.currency})</span></span>
                      <Badge variant={pay.status === 'paid' ? 'success' : pay.status === 'failed' ? 'outline' : 'default'}>{pay.status}</Badge>
                    </li>
                  ))}
                </ul>
                {proposal && proposal.installments && (
                  <div className="flex flex-col sm:flex-row items-end gap-3 max-w-md">
                    <div className="flex-1">
                      <label className="text-xs mb-1 block">Parcelamento</label>
                      <select value={selectedInstallments} onChange={e=>setSelectedInstallments(Number(e.target.value))} className="bg-slate-800 border border-white/20 rounded px-2 py-2 text-xs w-full">
                        {Array.from({length: Number(proposal.installments)}, (_, i) => i + 1).map(n => (
                          <option key={n} value={n}>{n}x de {formatCurrency(Number(proposal.amount)/n, currency)}</option>
                        ))}
                      </select>
                    </div>
                    <select value={currency} onChange={e=>setCurrency(e.target.value)} className="bg-slate-800 border border-white/20 rounded px-2 py-2 text-xs">
                      {SUPPORTED_CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <Button type="button" variant="outline" disabled={creatingPay} onClick={handleCreatePayment} className="text-xs h-auto px-3 py-2">{creatingPay ? 'Criando...' : 'Gerar Pagamento'}</Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProposalPage;
