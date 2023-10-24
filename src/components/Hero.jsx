import React from 'react';
import dw from "../assets/WB.png";

import "./Hero.css";

function Hero() {
  return (
    <footer className="hero">
      <div className="hero-content">
        <img src={dw} alt="Logo da VRZ Studio" />
        <p>&copy; VRZ Studio</p>
      </div>
    </footer>
  );
}

export default Hero;
