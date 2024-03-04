import React from "react";
import { styles } from "../styles";
import { useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";

import BannerHeroDesktop from "../assets/back-hero-bn.png"; // Imagem para desktop
import './main.css';

const Main = () => {
  useEffect(() => {
    const phrases = ["Bem vindos à VRZ Estúdio","...", "Criamos aplicações web e mobile","...", "Trazemos seu projeto à vida!"];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const textElement = document.getElementById("animated-text");
  
    function typeText() {
      const currentPhrase = phrases[phraseIndex];
      const currentText = currentPhrase.substring(0, charIndex + 1);
      textElement.textContent = currentText;
  
      if (!isDeleting) {
        charIndex++;
      } else {
        charIndex--;
      }
  
      if (isDeleting && charIndex === -1) {
        isDeleting = false;
  
        // Aguarde 3 segundos antes de iniciar a próxima frase
        setTimeout(() => {
          phraseIndex = (phraseIndex + 1) % phrases.length;
          charIndex = 0;
          typeText();
        }, 200);
        return;
      }
  
      if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
      }
  
      const speed = isDeleting ? 90 : 70; // Ajuste a velocidade de digitação e exclusão conforme necessário
  
      setTimeout(typeText, speed);
    }
  
    typeText();
  }, []);
  

  return (
    <section className={`relative w-full h-screen mx-auto`}>
      <div className={`absolute inset-0 top-[120px]  max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}>
        <div className='flex flex-col justify-center items-center mt-5'>
          <div className='w-5 h-5 rounded-full bg-[#915EFF]' />
          <div className='w-1 sm:h-60 h-80 violet-gradient' />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText} text-white uppercase`}>
            O que você  <span className='text-[#915EFF] uppercase' style={{ margin: '0 10px' }}>quer criar?</span>
          </h1>
          
          <div className="console">
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



