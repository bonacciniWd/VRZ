import React from "react";
import Lottie from "lottie-react";
import errorAnimation from "../../public/error.json";

const ErrorModal = ({ onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
    <div className="bg-white rounded-2xl p-8 flex flex-col items-center shadow-lg">
      <Lottie animationData={errorAnimation} style={{ width: 120, height: 120 }} loop={false} />
      <h2 className="text-red-600 text-xl font-bold mt-4 mb-2">Falha ao enviar mensagem!</h2>
      <button onClick={onClose} className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg font-semibold">Fechar</button>
    </div>
  </div>
);

export default ErrorModal;
