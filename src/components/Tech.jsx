import React from "react";

import "./Tech.css";
import { SectionWrapper } from "../hoc";
import imagem from "../assets/wotho.jpg";

const Tech = () => {
  return (
    <div className='door'>
      <div className="Container">
        <div className="Containertabs">
        <text className="Username">Wotho</text>
          <div className="Usertabs">
            <div class="button-wrapper">
              <button className="btn">
                <a href="https://www.behance.net/wotho" target="_blank">PORTFOLIO</a>
              </button>
            </div>
            <div class="button-wrapper">
              <button className="btn">
                <a href="https://www.linkedin.com/in/washington-nascimento-8832b3270" target="_blank">LINKEDIN</a>
            </button>
            </div>
            <div class="button-wrapper">
              <button className="btn">
                <a href="https://www.instagram.com/wotho/" target="_blank">INSTA</a>
              </button>
            </div>
            <div class="button-wrapper">
              <button className="btn">
                <a href="#">E-MAIL</a>
              </button>
            </div>
            
          </div>
          <div className="Userimage">
            <img src={imagem} alt="wotho" className="img" />
          </div>
        </div>


      </div>
    </div>
  );
};

export default SectionWrapper(Tech, "");
