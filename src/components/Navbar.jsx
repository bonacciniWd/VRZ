import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { styles } from "../styles";
import { logo, brazilFlag, italyFlag, franceFlag, spainFlag, usaFlag } from "../assets";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(brazilFlag);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrolled(scrollTop > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLanguageSelect = (flag) => {
    setSelectedLanguage(flag);
    setToggle(false); // Fecha o popup ao selecionar um idioma
    // Aqui você pode adicionar a lógica para mudar o idioma
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
          <li onClick={() => handleLanguageSelect(brazilFlag)} className={`flex items-center ${selectedLanguage === brazilFlag ? "border-4 border-indigo-800 rounded-full p-1" : ""}`}>
            <img src={brazilFlag} alt='Brazil Flag' className='w-10 h-10' />
          </li>
          <li onClick={() => handleLanguageSelect(italyFlag)} className={`flex items-center ${selectedLanguage === italyFlag ? "border-4 border-indigo-800 rounded-full p-1" : ""}`}>
            <img src={italyFlag} alt='Italy Flag' className='w-10 h-10' />
          </li>
          <li onClick={() => handleLanguageSelect(franceFlag)} className={`flex items-center ${selectedLanguage === franceFlag ? "border-4 border-indigo-800 rounded-full p-1" : ""}`}>
            <img src={franceFlag} alt='France Flag' className='w-10 h-10' />
          </li>
          <li onClick={() => handleLanguageSelect(spainFlag)} className={`flex items-center ${selectedLanguage === spainFlag ? "border-4 border-indigo-800 rounded-full p-1" : ""}`}>
            <img src={spainFlag} alt='Spain Flag' className='w-10 h-10' />
          </li>
          <li onClick={() => handleLanguageSelect(usaFlag)} className={`flex items-center ${selectedLanguage === usaFlag ? "border-4 border-indigo-800 rounded-full p-1" : ""}`}>
            <img src={usaFlag} alt='USA Flag' className='w-10 h-10' />
          </li>
        </ul>

        <div className='sm:hidden flex flex-1 justify-end items-center'>
          <img
            src={selectedLanguage}
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
              <li onClick={() => handleLanguageSelect(brazilFlag)} className="flex items-center">
                <img src={brazilFlag} alt='Brazil Flag' className='w-8 h-8' />
                <span className='ml-2 text-slate-200'>Português</span>
              </li>
              <li onClick={() => handleLanguageSelect(italyFlag)} className="flex items-center">
                <img src={italyFlag} alt='Italy Flag' className='w-8 h-8' />
                <span className='ml-2 text-slate-200'>Italiano</span>
              </li>
              <li onClick={() => handleLanguageSelect(franceFlag)} className="flex items-center">
                <img src={franceFlag} alt='France Flag' className='w-8 h-8' />
                <span className='ml-2 text-slate-200'>Français</span>
              </li>
              <li onClick={() => handleLanguageSelect(spainFlag)} className="flex items-center">
                <img src={spainFlag} alt='Spain Flag' className='w-8 h-8' />
                <span className='ml-2 text-slate-200'>Español</span>
              </li>
              <li onClick={() => handleLanguageSelect(usaFlag)} className="flex items-center">
                <img src={usaFlag} alt='USA Flag' className='w-8 h-8' />
                <span className='ml-2 text-slate-200'>English</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
