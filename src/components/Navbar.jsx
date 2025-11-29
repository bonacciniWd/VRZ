import React, { useEffect, useState } from "react";
import { useLanguage } from "../app/LanguageContext";
import { Link } from "react-router-dom";

import { styles } from "../styles";
import { logo, brazilFlag, italyFlag, franceFlag, spainFlag, usaFlag } from "../assets";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage } = useLanguage();
  // Flags associadas aos idiomas
  const flagMap = {
    pt: brazilFlag,
    it: italyFlag,
    fr: franceFlag,
    es: spainFlag,
    en: usaFlag,
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrolled(scrollTop > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLanguageSelect = (flag) => {
    // Encontra o código do idioma pelo flag
    const langCode = Object.keys(flagMap).find(key => flagMap[key] === flag);
    if (langCode) {
      setLanguage(langCode);
    }
    setToggle(false); // Fecha o popup ao selecionar um idioma
  };

  return (
    <nav
      className={`${styles.paddingX} w-[80%] flex items-center py-5 fixed top-[30px] left-1/2 transform -translate-x-1/2 z-50 ${
        scrolled ? "bg-azul-vr/40" : "bg-transparent border-none"
      } rounded-full bg-opacity-80 shadow-white-100/50 shadow-inner`}
    >
      <div className='w-full flex justify-between items-center max-w-7xl mx-auto'>
        <Link
          to='/'
          className='flex items-center gap-2'
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img
            src={logo}
            alt='logo'
            className={`w-32 h-12 object-contain ${active === "logo" ? "border-2 border-azul-vr rounded-full" : ""}`}
            style={{ padding: "1px", opacity: "1" }}
          />
          
        </Link>

        <ul className='list-none hidden sm:flex flex-row gap-10'>
          {Object.entries(flagMap).map(([code, flag]) => (
            <li
              key={code}
              onClick={() => handleLanguageSelect(flag)}
              className={`flex items-center cursor-pointer ${language === code ? "border-4 border-indigo-800 rounded-full p-1" : ""}`}
              style={{ zIndex: 100 }}
            >
              <img src={flag} alt={`${code} Flag`} className='w-10 h-10' />
            </li>
          ))}
        </ul>

        <div className='sm:hidden flex flex-1 justify-end items-center'>
          <img
            src={flagMap[language]}
            alt='language flag'
            className='w-12 h-12 py-1 border-2 border-azul-vr rounded-full bg-slate-700 object-contain cursor-pointer'
            onClick={() => setToggle(!toggle)}
          />

          {/* Menu Popup para idiomas em mobile */}
          <div
            className={`${
              toggle ? "flex" : "hidden"
            } p-6 bg-slate-800 bg-opacity-80 border-2 mt-4 border-indigo-700 absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
          >
            <ul className='list-none flex justify-end items-start flex-1 flex-col gap-4'>
              {Object.entries(flagMap).map(([code, flag]) => (
                <li key={code} onClick={() => handleLanguageSelect(flag)} className="flex items-center">
                  <img src={flag} alt={`${code} Flag`} className='w-8 h-8' />
                  <span className='ml-2 text-slate-200'>
                    {code === "pt" ? "Português" :
                     code === "it" ? "Italiano" :
                     code === "fr" ? "Français" :
                     code === "es" ? "Español" :
                     "English"}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
