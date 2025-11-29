import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";
import { useLanguage } from "../app/LanguageContext";
import { translations } from "../app/translations";

import "react-vertical-timeline-component/style.min.css";

import { styles } from "../styles";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";

const ExperienceCard = ({ experience }) => {
  const { language } = useLanguage();
  const linearGradientBackground = "linear-gradient(135deg, rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.8))";
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: linearGradientBackground, 
        borderRadius: "1%",
      }}
      contentArrowStyle={{ borderRight: "18px solid #27BA7D" }}
      date={experience.date}
      iconStyle={{ background: experience.iconBg }}
      icon={
        <div className='flex justify-center items-center w-full h-full'>
          <img
            src={experience.icon}
            alt={experience.company_name[language]}
            className='w-[99%] h-[99%] object-contain rounded-full'
          />
        </div>
      }
    >
      <div>
        <h3 className='text-slate-100 text-[24px] font-bold text-center mb-4'>{experience.title[language]}</h3>
        <p
          className='text-verde-vr text-[16px] font-semibold'
          style={{ margin: 0 }}
        >
          {experience.company_name[language]}
        </p>
      </div>

      <ul className='mt-5 list-disc ml-5 space-y-2'>
        {experience.points[language].map((point, index) => (
          <li
            key={`experience-point-${index}`}
            className='text-slate-300 text-[14px] pl-1 tracking-wider'
          >
            {point}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};

const Experience = () => {
  const { language } = useLanguage();
  const experienceTexts = translations[language]?.experience || translations["pt"].experience;
  return (
    <>
      <p className={`${styles.sectionSubText} text-center`}>
        {experienceTexts.title}
      </p>
      <h2 className={`${styles.sectionHeadText} text-center`}>
        {experienceTexts.description}
      </h2>
      <div className='mt-20 flex flex-col'>
        <VerticalTimeline>
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={`experience-${index}`}
              experience={experience}
            />
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
};

export default SectionWrapper(Experience, "work");
