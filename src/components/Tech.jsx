import React, { useEffect } from "react";
import { styles } from "../styles";
import { useLanguage } from "../app/LanguageContext";
import { translations } from "../app/translations";
import BannerHeroDesktop from "../assets/back-hero-bn.png"; // Imagem para desktop
import './main.css';

const Main = () => {
  const { language } = useLanguage();
  const techTexts = translations[language]?.tech || translations["pt"].tech;

  

  useEffect(() => {
    const phrases = [
      techTexts.title,
      techTexts.description,
      "Visione Rifatta Studio",
      language === "pt" ? "Criamos aplicações web e mobile" :
      language === "en" ? "We create web and mobile apps" :
      language === "es" ? "Creamos aplicaciones web y móviles" :
      language === "it" ? "Creiamo applicazioni web e mobile" :
      language === "fr" ? "Nous créons des applications web et mobiles" :
      "",
      language === "pt" ? "Trazemos seu projeto à vida!" :
      language === "en" ? "We bring your project to life!" :
      language === "es" ? "¡Damos vida a tu proyecto!" :
      language === "it" ? "Diamo vita al tuo progetto!" :
      language === "fr" ? "Nous donnons vie à votre projet!" :
      ""
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const textElement = document.getElementById("animated-text");
    let timeoutId;

    function typeText() {
      const currentPhrase = phrases[phraseIndex];
      const currentText = currentPhrase.substring(0, charIndex + 1);
      if (textElement) textElement.textContent = currentText;

      if (!isDeleting) {
        charIndex++;
      } else {
        charIndex--;
      }

      if (isDeleting && charIndex === -1) {
        isDeleting = false;
        timeoutId = setTimeout(() => {
          phraseIndex = (phraseIndex + 1) % phrases.length;
          charIndex = 0;
          typeText();
        }, 200);
        return;
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
      }

      const speed = isDeleting ? 30 : 60;
      timeoutId = setTimeout(typeText, speed);
    }

    typeText();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (textElement) textElement.textContent = "";
    };
  }, [language]);
  

  return (
    <section className={`relative w-full h-screen mx-auto`}>
      <div className={`absolute inset-0 top-[120px]  max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}>
        <div className='flex flex-col justify-center items-center mt-5'>
          <div className='w-5 h-5 rounded-full bg-azul-vr shadow-inner shadow-white-100' />
          <div className='w-1 sm:h-60 h-80 violet-gradient shadow-white-100' />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText} text-white uppercase`}>
            {techTexts.title} <span className='uppercase' style={{ margin: '0 10px' }}></span>
          </h1>
          <div className="console mt-4 shadow-white-100 shadow-inner">
            <pre>
              <code id="animated-text"></code>
            </pre>
          </div>
          <div>
            <img className="banner-hero" src={BannerHeroDesktop} alt="Imagem para desktop" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Main;



