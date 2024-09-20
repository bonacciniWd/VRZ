import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { styles } from "../styles";
import { logo, brazilFlag, usaFlag, italyFlag, franceFlag, spainFlag } from "../assets";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentFlag, setCurrentFlag] = useState(brazilFlag);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrolled(scrollTop > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLanguageChange = (flag) => {
    setCurrentFlag(flag); // Atualiza a bandeira para o idioma selecionado
    setToggle(false); // Fecha o menu após selecionar um idioma
  };

  return (
    <nav
      className={`${
        styles.paddingX
      } w-[80%] flex items-center py-5 fixed top-[30px] left-1/2 transform -translate-x-1/2 z-20 ${
        scrolled ? "bg-primary" : "bg-transparent border-none"
      } rounded-full bg-opacity-80 shadow-lg border-x-2 border-indigo-700`}
    >
      <div className='w-full flex justify-between items-center max-w-7xl mx-auto'>
        <Link
          to='/'
          className='flex items-center gap-2'
          onClick={() => window.scrollTo(0, 0)}
        >
          <img
            src={logo}
            alt='logo'
            className='w-12 h-12 object-contain'
            style={{ borderRadius: "50px", padding: "3px", opacity: "1" }}
          />
          <p className='text-slate-200 text-[18px] font-bold cursor-pointer flex'>
            DEV STUDIO || &nbsp;
            <span className='sm:block hidden'> MKT STUDIO</span>
          </p>
        </Link>

        {/* Menu de bandeiras no lugar do menu de hamburguer */}
        <div className='sm:hidden flex flex-1 justify-end items-center'>
          <img
            src={currentFlag}  // Bandeira atual
            alt='menu'
            className='w-[28px] h-[28px] object-contain cursor-pointer'
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 bg-slate-900 border-2 border-indigo-700 bg-opacity-90 absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
          >
            <ul className='list-none flex justify-end items-start flex-1 flex-col gap-4'>
              <li
                className='font-poppins font-medium cursor-pointer text-[16px] flex items-center gap-2'
                onClick={() => handleLanguageChange(usaFlag)}
              >
                <img src={usaFlag} alt='USA Flag' className='w-6 h-6' /> EUA
              </li>
              <li
                className='font-poppins font-medium cursor-pointer text-[16px] flex items-center gap-2'
                onClick={() => handleLanguageChange(italyFlag)}
              >
                <img src={italyFlag} alt='Italy Flag' className='w-6 h-6' /> Itália
              </li>
              <li
                className='font-poppins font-medium cursor-pointer text-[16px] flex items-center gap-2'
                onClick={() => handleLanguageChange(franceFlag)}
              >
                <img src={franceFlag} alt='France Flag' className='w-6 h-6' /> França
              </li>
              <li
                className='font-poppins font-medium cursor-pointer text-[16px] flex items-center gap-2'
                onClick={() => handleLanguageChange(spainFlag)}
              >
                <img src={spainFlag} alt='Spain Flag' className='w-6 h-6' /> Espanha
              </li>
            </ul>
          </div>
        </div>

        {/* Menu padrão para desktop */}
        <ul className='list-none hidden sm:flex flex-row gap-10'>
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${
                active === nav.title ? "text-white" : "text-secondary"
              } hover:text-white text-[18px] font-medium cursor-pointer`}
              onClick={() => setActive(nav.title)}
            >
              <a href={`#${nav.id}`}>{nav.title}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
