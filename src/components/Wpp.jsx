// Wpp.jsx
import React from 'react';
import './Wpp.css';
import wpplogo from '../assets/tech/wpplogo.png';

function Wpp() {
  return (
    <div className="wpp-button">
      <a href="https://api.whatsapp.com/send?phone=+5547997020079" target="_blank" rel="noopener noreferrer">
        <img src={wpplogo} className='pulse' />
      </a>
    </div>
  );
}

export default Wpp;
