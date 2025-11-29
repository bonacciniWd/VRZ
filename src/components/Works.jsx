import React from "react";
import Tilt from "react-tilt";
import { motion } from "framer-motion";
import { useLanguage } from "../app/LanguageContext";
import { translations } from "../app/translations";

import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
}) => {
  const { language } = useLanguage();
  const linearGradientBackground = "linear-gradient(135deg, rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.8))";
  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.5, 0.75)}
      onClick={() => window.open(source_code_link, "_blank")}
      className='cursor-pointer'
    >
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className="p-5 rounded-2xl bg-azul-vr/40 shadow-inner shadow-white-100/60 sm:w-[360px] w-full"
      >
        <div className='relative w-full h-[230px]'>
          <img
            src={image}
            alt={name[language]}
            className='w-full h-full object-cover rounded-2xl border-2 border-slate-700'
          />
          <div className='absolute inset-0 flex justify-end m-3 card-img_hover'>
            <div
              onClick={() => window.open(source_code_link, "_blank")}
              className='black-gradient w-12 h-12 rounded-full flex justify-center items-center border-2 border-pink-vr cursor-pointer'
            >
              <img
                src={github}
                alt='source code'
                className='w-[50%] h-[50%] object-fit '
              />
            </div>
          </div>
        </div>
        <div className='mt-5'>
          <h3 className='text-white font-bold text-[24px]'>{name[language]}</h3>
          <p className='mt-2 text-slate-300 text-[14px]'>{description[language]}</p>
        </div>
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  const { language } = useLanguage();
  const worksTexts = translations[language]?.works || translations["pt"].works;
  return (
    <>
      <motion.div  variants={textVariant()}>
        <p className={`${styles.sectionSubText} `}>{worksTexts.title}</p>
        <h2 className={`${styles.sectionHeadText}`}>{worksTexts.title}</h2>
      </motion.div>

      <div className='w-full flex'>
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className='mt-3 text-slate-300 text-[17px] max-w-3xl leading-[30px]'
        >
          {worksTexts.description}
        </motion.p>
      </div>

      <div className='mt-20 flex flex-wrap gap-7'>
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "");
