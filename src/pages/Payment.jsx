import React from 'react';
import { useParams } from 'react-router-dom';

const PaymentPage = () => {
  const { id } = useParams();
  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <h1 className="text-2xl font-semibold mb-4">Pagamento</h1>
      <p>ID do pagamento: {id}</p>
      <p>Em breve: QRCode Pix e status em tempo real.</p>
    </div>
  );
};

export default PaymentPage;
