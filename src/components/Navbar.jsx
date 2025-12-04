import React, { useEffect, useState } from "react";
import { useLanguage } from "../app/LanguageContext";
import { Link, useNavigate } from "react-router-dom";

import { styles } from "../styles";
import { logo, brazilFlag, italyFlag, franceFlag, spainFlag, usaFlag } from "../assets";

import { useAuth } from "../app/AuthContext.jsx";
import { LucideUser } from "lucide-react";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage } = useLanguage();
  const { session, signOut, profile } = useAuth();
  const navigate = useNavigate();
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
      className={`${styles.paddingX} w-[80%] h-16 md:h-20 flex items-center py-5 fixed top-[20px] left-1/2 transform -translate-x-1/2 z-50 ${
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
            className={`w-32 h-16 object-contain ${active === "logo" ? "border-2 border-azul-vr rounded-full" : ""}`}
            style={{ padding: "1px", opacity: "1" }}
          />
          
        </Link>

        <ul className='list-none hidden sm:flex flex-row gap-6 items-center'>
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
          {session && (
            <li>
              <button onClick={() => navigate('/dashboard')} className='text-xs md:text-sm text-slate-300 hover:text-verde-vr' aria-label='Painel'>Painel</button>
            </li>
          )}
          {session && profile?.role === 'admin' && (
            <li>
              <button onClick={() => navigate('/admin')} className='text-xs md:text-sm text-verde-vr hover:underline' aria-label='Admin'>Admin</button>
            </li>
          )}
          <li>
            {session ? (
              <button
                onClick={() => { signOut(); }}
                className='px-4 py-1.5 text-xs md:text-sm font-medium rounded-full border bg-slate-800/60 text-slate-200 border-white/20 hover:border-verde-vr hover:text-white transition-colors backdrop-blur-sm'
              >Sair</button>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className='px-2 py-1.5 text-xs md:text-sm font-medium rounded-full border bg-verde-vr/90 text-gray-50 border-verde-vr hover:bg-azul-vr/30 transition-colors backdrop-blur-sm'
              ><LucideUser /></button>
            )}
          </li>
        </ul>

        <div className='sm:hidden flex flex-1 justify-end items-center'>
          <img
            src={flagMap[language]}
            alt='language flag'
            className='w-12 h-12 py-1 border-2 border-verde-vr rounded-full bg-slate-700 object-contain cursor-pointer'
            onClick={() => setToggle(!toggle)}
          />

          {/* Menu Popup para idiomas em mobile */}
          <div
            className={`${
              toggle ? "flex" : "hidden"
            } p-6 bg-slate-800 bg-opacity-80 border-2 mt-4 border-verde-vr absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
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
              {session && (
                <li>
                  <button onClick={() => { navigate('/dashboard'); setToggle(false); }} className='text-sm text-slate-300 hover:text-verde-vr' aria-label='Painel'>Painel</button>
                </li>
              )}
              {session && profile?.role === 'admin' && (
                <li>
                  <button onClick={() => { navigate('/admin'); setToggle(false); }} className='text-sm text-verde-vr hover:underline' aria-label='Admin'>Admin</button>
                </li>
              )}
              <li>
                {session ? (
                  <button
                    onClick={() => { signOut(); setToggle(false); }}
                    className='w-full px-4 py-1.5 text-sm rounded-full border bg-slate-800/60 text-slate-200 border-white/20 hover:border-verde-vr hover:text-white font-medium transition-colors backdrop-blur-sm'
                  >Sair</button>
                ) : (
                  <button
                    onClick={() => { navigate('/login'); setToggle(false); }}
                    className='w-full px-4 py-1.5 text-sm rounded-full border bg-verde-vr/90 text-gray-50 border-verde-vr hover:bg-azul-vr/30 font-medium transition-colors backdrop-blur-sm'
                  >Entrar</button>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
