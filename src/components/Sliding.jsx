import React from 'react';
import './Sliding.css';
import videoSource from '../assets/tech/video.mp4';


const Sliding = () => {

  const isDesktop = window.innerWidth > 768;
  if (!isDesktop) {
    return null;
  }
  return (
    
    <div className="video-container mb-10">
      <video autoPlay loop muted disablePictureInPicture className='video'>
        <source src={videoSource} type="video/mp4" />
        Seu navegador não suporta vídeos HTML5.
      </video>
    </div>
  );
};

export default Sliding;
