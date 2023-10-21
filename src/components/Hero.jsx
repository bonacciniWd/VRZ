import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import oto from "../assets/wotho.jpg";

const Hero = () => {
  useEffect(() => {
    const textElement = document.getElementById("animated-text");
    const phrases = ["Form and Function?", "Unleash Creativity?", "Discover Whoto.art!"];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

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
        }, );
        return;
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
      }

      const speed = isDeleting ? 70 : 70; // Ajuste a velocidade de digitação e exclusão conforme necessário

      setTimeout(typeText, speed);
    }

    typeText();
  }, []);

  return (
    <section className={`relative w-full h-screen mx-auto`}>
      <div className={`absolute inset-0 top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}>
        <div className='flex flex-col justify-center items-center mt-5'>
          

        </div>

        <div>
          <h1 className={`${styles.heroHeadText} text-white`} style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)", textAlign:"center", padding: "10px"}}>
            Wotho<span className='text-[#32cd32]'>.</span><span className='text-[#ff0]'> Art</span>
          </h1>

          <img 
            src={oto} // Substitua pelo caminho da sua imagem
            alt="Descrição da imagem"
            style={{
              width: "100%",  // Torna a imagem responsiva
              maxWidth: "300px",  // Limita a largura máxima a 300px
              height: "auto",  // Mantém a proporção original da imagem
              borderRadius: "200px",
              boxShadow: "5px 5px 5px rgba(0, 0, 0, 0.7)", 
              border: "2px solid transparent",
              borderImageSlice: 1,
              display: "block"
            }}
          />


          <p className={`${styles.heroSubText} mt-2 text-white-500`}>
            <span id="animated-text" style={{ display: "inline-block", 
              color: "#f1f1f1", 
              textShadow: "1px 1px 2px rgba(0, 0, 0, 0.7)", 
              fontSize:"25px",
              textAlign:"center",
                textTransform: "uppercase" }}>
            </span>
          </p>
        </div>
      </div>

      <div className='absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center'>
        <a href='#about'>
          <div className='w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2'>
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className='w-3 h-3 rounded-full bg-secondary mb-1'
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
