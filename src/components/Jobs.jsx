import { motion } from 'framer-motion';
import { services } from '../constants/index';
import { useLanguage } from "../app/LanguageContext";
import { translations } from "../app/translations";

const Jobs = () => {
  const { language } = useLanguage();
  const jobsTexts = translations[language]?.jobs || translations["pt"].jobs;
  return (
    <div className="w-full h-auto py-6 text-center">
      <div className="my-8 mx-4 justify-center text-slate-100">
        <h2 className="text-5xl font-bold mb-10">{jobsTexts.title}</h2>
        <p className="mb-6 text-lg text-slate-300">{jobsTexts.description}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-32 py-24 lg:px-32">
          {services.map((service, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.97 }}
              className="relative flex flex-col items-center pt-24 pb-12 px-6 lg:px-16 bg-gradient-to-br from-azul-vr/70 via-azul-vr/40 to-verde-vr/30 rounded-3xl shadow-lg border-2 border-verde-vr/60 transition-transform duration-300 ease-in-out hover:shadow-xl hover:border-verde-vr/90"
            >
              <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-full max-w-[320px] h-52 flex items-center justify-center bg-white/10 rounded-2xl shadow-md overflow-hidden">
                <img
                  src={service.icon}
                  alt={service.title[language]}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white tracking-wide text-center drop-shadow-lg mt-8">{service.title[language]}</h3>
              <p className="text-slate-300 text-base mx-2 text-center leading-relaxed">{service.description[language]}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
