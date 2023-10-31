import React, { useState } from 'react';
import './Sliding.css';

const Sliding = () => {
  const [isLeftActive, setLeftActive] = useState(true); // Defina o estado inicial como true para exibir o painel esquerdo
  const [isRightActive, setRightActive] = useState(false);

  const openLeft = () => {
    setLeftActive(true);
    setRightActive(false);
  };

  const openRight = () => {
    setRightActive(true);
    setLeftActive(false);
  };

  const leftPanelClasses = `panels__side panels__side--left ${
    isLeftActive ? '' : 'panels__side--left-inactive'
  }`;

  const rightPanelClasses = `panels__side panels__side--right ${
    isRightActive ? '' : 'panels__side--right-inactive'
  }`;

  return (
    <div className="overflow">
      <section className="panels">
        <article className={leftPanelClasses} onClick={openLeft}>
          <div className="panels__side panels__side--inner-left">
            <p>Teste e teste é sempre um teste</p>
          </div>
          <div className="panels__side panels__side-inner">
            <h1 className="panels__headline">Denis Bonaccini</h1>
            <svg className="arrow arrow--left" width="40" height="40" />
          </div>
        </article>
        <article className={rightPanelClasses} onClick={openRight}>
          <div className="panels__side panels__side--inner">
            <h1 className="panels__headline">Vinicius Oliveira</h1>
            <svg className="arrow arrow--right" width="40" height="40" />
            <p>"the teste is a eleven tester"</p>
          </div>
        </article>
      </section>
    </div>
  );
};

export default Sliding;
