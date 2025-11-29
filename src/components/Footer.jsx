import React from "react";
import Lottie from "lottie-react";
import vrzAnimation from "../../public/vrz.json";
import { useLanguage } from "../app/LanguageContext";
import { translations } from "../app/translations";

function Footer() {
  const { language } = useLanguage();
  const footerTexts = translations[language]?.footer || translations["pt"].footer;

  return (
    <footer className="text-center relative">
      <div className="relative flex justify-center items-center mb-4">
        <Lottie animationData={vrzAnimation}
          style={{ width: 90, height: 90 }}
          loop={true}
        />
      </div>
      <div className="mb-10">
        <p>{footerTexts.text} <br/>2025 &copy;</p>
      </div>
    </footer>
  );
}

export default Footer;
