import React from "react";
import Tilt from "react-tilt";
import { motion } from "framer-motion";
import { StarsCanvas } from "./canvas";
import { useLanguage } from "../app/LanguageContext";
import { translations } from "../app/translations";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const ServiceCard = ({ index, title, icon }) => (
  <Tilt className='xs:w-[250px] w-full'>
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'
    >
      <div
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className='bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'
      >
        <img
          src={icon}
          alt='web-development'
          className='w-16 h-16 object-contain'
        />

        <h3 className='text-white text-[20px] font-bold text-center'>
          {title}
        </h3>
      </div>
    </motion.div>
  </Tilt>
);

const About = () => {
  const { language } = useLanguage();
  const aboutTexts = translations[language]?.about || translations["pt"].about;
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>{aboutTexts.title}</p>
        <h2 className={styles.sectionHeadText}>{aboutTexts.description}</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className='mt-4  text-secondary text-[17px] max-w-3xl leading-[30px]'
      >
        {/* Texto principal pode ser expandido para traduções completas */}
        {language === "pt" && "Somos uma software house especializada em soluções tecnológicas sob medida, com expertise em TypeScript, JavaScript e frameworks como React, Node.js e Three.js. Trabalhamos de forma colaborativa com nossos clientes, criando sistemas eficientes, escaláveis e intuitivos que resolvem desafios reais. Vamos transformar suas ideias em soluções inovadoras."}
        {language === "en" && "We are a software house specialized in custom tech solutions, with expertise in TypeScript, JavaScript and frameworks like React, Node.js and Three.js. We work collaboratively with our clients, creating efficient, scalable and intuitive systems that solve real challenges. Let's turn your ideas into innovative solutions."}
        {language === "es" && "Somos una software house especializada en soluciones tecnológicas a medida, con experiencia en TypeScript, JavaScript y frameworks como React, Node.js y Three.js. Trabajamos de forma colaborativa con nuestros clientes, creando sistemas eficientes, escalables e intuitivos que resuelven desafíos reales. ¡Vamos a transformar tus ideas en soluciones innovadoras!"}
        {language === "it" && "Siamo una software house specializzata in soluzioni tecnologiche su misura, con esperienza in TypeScript, JavaScript e framework come React, Node.js e Three.js. Collaboriamo con i nostri clienti per creare sistemi efficienti, scalabili e intuitivi che risolvono sfide reali. Trasformiamo le tue idee in soluzioni innovative."}
        {language === "fr" && "Nous sommes une société de développement spécialisée dans les solutions technologiques sur mesure, avec une expertise en TypeScript, JavaScript et des frameworks comme React, Node.js et Three.js. Nous travaillons en collaboration avec nos clients, créant des systèmes efficaces, évolutifs et intuitifs qui relèvent de vrais défis. Transformons vos idées en solutions innovantes."}
      </motion.p>

      <StarsCanvas />
    </>
  );
};

export default SectionWrapper(About, "about");
