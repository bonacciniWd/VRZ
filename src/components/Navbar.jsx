import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { styles } from "../styles";
import { logo, brazilFlag, usaFlag, italyFlag, franceFlag, spainFlag } from "../assets";

const Navbar = () => {
  const [langToggle, setLangToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrolled(scrollTop > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
            style={{ borderRadius: "50px", padding: "1px", opacity: "1" }}
          />
          <p className='text-slate-200 text-[18px] font-bold cursor-pointer flex'>
            DEV STUDIO || &nbsp;
            <span className='sm:block hidden'> MKT STUDIO</span>
          </p>
        </Link>

        {/* Botão da bandeira do Brasil */}
        <button
          className='flex items-center justify-center w-12 h-12 rounded-full bg-indigo-700 bg-opacity-50'
          onClick={() => setLangToggle(!langToggle)}
        >
          <img src={brazilFlag} alt='Bandeira do Brasil' className='w-10 h-10' />
        </button>

        {/* Popup de seleção de idiomas */}
        <div
          className={`${
            !langToggle ? "hidden" : "flex"
          } p-6 bg-slate-900 bg-opacity-90 absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
        >
          <ul className='list-none flex flex-col gap-4'>
            <li className='font-poppins font-medium cursor-pointer text-[16px] flex items-center'>
              <img src={usaFlag} alt='Bandeira dos EUA' className='w-6 h-6 inline mr-2' /> Estados Unidos
            </li>
            <li className='font-poppins font-medium cursor-pointer text-[16px] flex items-center'>
              <img src={italyFlag} alt='Bandeira da Itália' className='w-6 h-6 inline mr-2' /> Itália
            </li>
            <li className='font-poppins font-medium cursor-pointer text-[16px] flex items-center'>
              <img src={franceFlag} alt='Bandeira da França' className='w-6 h-6 inline mr-2' /> França
            </li>
            <li className='font-poppins font-medium cursor-pointer text-[16px] flex items-center'>
              <img src={spainFlag} alt='Bandeira da Espanha' className='w-6 h-6 inline mr-2' /> Espanha
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
