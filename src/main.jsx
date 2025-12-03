import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";
import { LanguageProvider } from "./app/LanguageContext";
import { AuthProvider } from "./app/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LanguageProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </LanguageProvider>
  </React.StrictMode>
);
