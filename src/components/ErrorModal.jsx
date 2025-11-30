
import React from "react";
import Lottie from "lottie-react";
import errorAnimation from "/error.json";
import { useLanguage } from "../app/LanguageContext";
import { translations } from "../app/translations";

const ErrorModal = ({ onClose, language }) => {
  const modalTexts = (translations[language] && translations[language].modals) ? translations[language].modals : translations["pt"].modals;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-slate-900/95 mx-auto px-4 rounded-2xl p-8 flex flex-col items-center shadow-inner shadow-verde-vr">
        <Lottie animationData={errorAnimation} style={{ width: 180, height: 120 }} loop={true} />
        <h2 className="text-white-100 text-lg font-bold mt-4 mb-2">{modalTexts.error}</h2>
        <button onClick={onClose} className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg font-semibold">{modalTexts.close}</button>
      </div>
    </div>
  );
};

export default ErrorModal;
