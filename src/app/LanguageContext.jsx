import React, { createContext, useContext, useState } from "react";

const languages = {
  pt: "Português",
  it: "Italiano",
  fr: "Français",
  es: "Español",
  en: "English"
};

const LanguageContext = createContext({
  language: "pt",
  setLanguage: () => {},
});

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("pt");
  return (
    <LanguageContext.Provider value={{ language, setLanguage, languages }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
