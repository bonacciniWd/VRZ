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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-azul-vr/40 p-6 rounded-lg shadow-white-100/60 shadow-inner border-b-2 border-verde-vr/80 flex flex-col items-center transition-transform duration-300 ease-in-out"
            >
              <img
                src={service.icon}
                alt={service.title[language]}
                className="w-[90%] h-auto  border-indigo-700 rounded-lg my-auto mb-4 transition-transform duration-300 ease-in-out transform hover:scale-110"
              />
              <h3 className="text-2xl font-semibold mb-2 text-white">{service.title[language]}</h3>
              <p className="text-slate-300 text-sm mx-6">{service.description[language]}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
