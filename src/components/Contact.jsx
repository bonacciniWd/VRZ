import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { useLanguage } from "../app/LanguageContext";
import { translations } from "../app/translations";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

const Contact = () => {

  const linearGradientBackground = "linear-gradient(135deg, rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.8))";

  
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "",
          from_email: form.email,
          to_email: "",
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          alert("Obrigado pelo contato, Entraremos em contato em breve...");

          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);

          alert("Ahh, algo não saiu bem... tente novamente mais tarde");
        }
      );
  };

  const { language } = useLanguage();
  const contactTexts = translations[language]?.contact || translations["pt"].contact;
  return (
    <>
      <div
        className={`xl:mt-12 mb-10 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}
      >
        <motion.div
          variants={slideIn("right", "tween", 0.2, 1)}
          className='xl:flex-1 xl:h-[80dvh] md:h-[350px] h-[215px]'
        >
          <EarthCanvas />
        </motion.div>
        <motion.div
          variants={slideIn("left", "tween", 0.2, 1)}
          className='flex-[0.75] p-8 rounded-2xl shadow-inner shadow-white-100 bg-azul-vr/30 bg-opacity-70'
        >
          <p className={styles.sectionSubText}>{contactTexts.title}</p>
          <h3 className={styles.sectionHeadText}>{contactTexts.description}</h3>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className='mt-12 flex flex-col gap-8'
          >
            <label className='flex flex-col'>
              <span className='text-white font-medium mb-4'>
                {language === "pt" ? "Seu nome" :
                 language === "en" ? "Your name" :
                 language === "es" ? "Tu nombre" :
                 language === "it" ? "Il tuo nome" :
                 language === "fr" ? "Votre nom" :
                 "Seu nome"}
              </span>
              <input
                type='text'
                name='name'
                value={form.name}
                onChange={handleChange}
                placeholder={language === "pt" ? "Nome completo" :
                  language === "en" ? "Full name" :
                  language === "es" ? "Nombre completo" :
                  language === "it" ? "Nome completo" :
                  language === "fr" ? "Nom complet" :
                  "Nome completo"}
                className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg border-[1px] border-white-100/60 font-medium'
              />
            </label>
            <label className='flex flex-col'>
              <span className='text-white font-medium mb-4'>
                {language === "pt" ? "Seu email" :
                 language === "en" ? "Your email" :
                 language === "es" ? "Tu correo" :
                 language === "it" ? "La tua email" :
                 language === "fr" ? "Votre email" :
                 "Seu email"}
              </span>
              <input
                type='email'
                name='email'
                value={form.email}
                onChange={handleChange}
                placeholder={language === "pt" ? "Seu melhor e-mail" :
                  language === "en" ? "Your best email" :
                  language === "es" ? "Tu mejor correo" :
                  language === "it" ? "La tua migliore email" :
                  language === "fr" ? "Votre meilleur email" :
                  "Seu melhor e-mail"}
                className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg border-[1px] border-white-100/60 font-medium'
              />
            </label>
            <label className='flex flex-col'>
              <span className='text-white font-medium mb-4'>
                {language === "pt" ? "Sua mensagem" :
                 language === "en" ? "Your message" :
                 language === "es" ? "Tu mensaje" :
                 language === "it" ? "Il tuo messaggio" :
                 language === "fr" ? "Votre message" :
                 "Sua mensagem"}
              </span>
              <textarea
                rows={7}
                name='message'
                value={form.message}
                onChange={handleChange}
                placeholder={language === "pt" ? "Por favor, forneça a maior quantidade de dados possíveis para que possa lhe ajudar de maneira mais eficiente..." :
                  language === "en" ? "Please provide as much information as possible so I can help you more efficiently..." :
                  language === "es" ? "Por favor, proporciona la mayor cantidad de datos posible para que pueda ayudarte de manera más eficiente..." :
                  language === "it" ? "Per favore, fornisci quante più informazioni possibili così posso aiutarti in modo più efficiente..." :
                  language === "fr" ? "Veuillez fournir autant d'informations que possible afin que je puisse vous aider plus efficacement..." :
                  "Por favor, forneça a maior quantidade de dados possíveis para que possa lhe ajudar de maneira mais eficiente..."}
                className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg border-[1px] border-white-100/60 font-medium'
              />
            </label>

            <button
              type='submit'
              className='bg-tertiary py-3 px-8 rounded-xl border-2 border-verde-vr w-fit text-white font-bold shadow-md shadow-primary'
            >
              {loading ? (
                language === "pt" ? "Enviando..." :
                language === "en" ? "Sending..." :
                language === "es" ? "Enviando..." :
                language === "it" ? "Invio..." :
                language === "fr" ? "Envoi..." :
                "Enviando..."
              ) : (
                language === "pt" ? "Enviar" :
                language === "en" ? "Send" :
                language === "es" ? "Enviar" :
                language === "it" ? "Invia" :
                language === "fr" ? "Envoyer" :
                "Enviar"
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </>
  );
};

export default SectionWrapper(Contact, "contact");
