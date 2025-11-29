import React, { useEffect, useState } from "react";
import { useLanguage } from "../app/LanguageContext";
import { translations } from "../app/translations";

function Footer() {
  const [frameIndex, setFrameIndex] = useState(0);
  const totalFrames = 210;
  const frameRate = 30;
  const { language } = useLanguage();
  const footerTexts = translations[language]?.footer || translations["pt"].footer;

  useEffect(() => {
    const interval = setInterval(() => {
      setFrameIndex((prevIndex) => (prevIndex + 1) % totalFrames);
    }, frameRate);
    return () => clearInterval(interval);
  }, []);

  const framePath = `/frames/Motion_VRZ_Completa_${String(frameIndex).padStart(5, "0")}.png`;

  return (
    <footer className="text-center relative">
      <div className="relative flex justify-center items-center mb-4">
        <img
          src={framePath}
          alt="Animação da logo VRZ"
          className="w-[200px] sm:w-[200px] md:w-[200px] lg:w-[200px]"
        />
      </div>
      <div className="mb-10">
        <p>{footerTexts.text} <br/>2025 &copy;</p>
      </div>
    </footer>
  );
}

export default Footer;
