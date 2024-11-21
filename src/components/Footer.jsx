import React, { useEffect, useState } from "react";

function Footer() {
  const [frameIndex, setFrameIndex] = useState(0);
  const totalFrames = 210; // Total de frames na animação
  const frameRate = 30; // Intervalo entre frames (em ms)

  useEffect(() => {
    const interval = setInterval(() => {
      setFrameIndex((prevIndex) => (prevIndex + 1) % totalFrames);
    }, frameRate);

    return () => clearInterval(interval);
  }, []);

  const framePath = `/frames/Motion_VRZ_Completa_${String(frameIndex).padStart(5, "0")}.png`;

  return (
    <footer className="text-center relative">
      {/* Animação da Logo */}
      <div className="relative flex justify-center items-center mb-4">
        <img
          src={framePath}
          alt="Animação da logo VRZ"
          className="w-[200px] sm:w-[300px] md:w-[360px] lg:w-[400px]"
        />
      </div>

      {/* Texto do Rodapé */}
      <div className="mb-10">
        <p>VRZ Studio 2024 &copy;</p>
      </div>
    </footer>
  );
}

export default Footer;
