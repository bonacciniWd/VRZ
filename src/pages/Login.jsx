import React, { useState, Suspense } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../app/AuthContext.jsx';
import Tilt from 'react-tilt';
import { motion } from 'framer-motion';
import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import { Stars } from "../components/canvas/Stars";
import "../components/Contact.css";
import loginBgVideo from '../assets/loginbg.webm';

const Login = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true); setError(null);
    try {
      await signIn(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center text-white p-4 overflow-hidden relative">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src={loginBgVideo} type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50 z-0"></div>

      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm bg-slate-900 bg-opacity-85 border border-verde-vr rounded-[1em] p-6 space-y-3 relative z-10"
      >
        <form onSubmit={onSubmit} className="relative z-10">
          
          <div className="mx-auto mb-8 w-full h-56 relative group contact-animated-border rounded-[1em] flex items-center justify-center">
            {/* Stars Background */}
            <div className="absolute inset-0 rounded-[2em] overflow-hidden z-0">
                <Canvas camera={{ position: [0, 0, 1] }}>
                  <Suspense fallback={null}>
                    <Stars size={0.004} color="#ffffff" />
                  </Suspense>
                  <Preload all />
                </Canvas>
            </div>

            {/* Moving Content */}
            <Tilt className="w-full h-full flex items-center justify-center relative z-10" options={{ max: 45, scale: 1.2, speed: 400, perspective: 500 }}>
              <div style={{ transformStyle: 'preserve-3d' }} className="flex justify-center items-center relative w-full h-full">
                 <img src="/src/assets/logo.png" alt="Logo VR" className="w-32 relative z-20 drop-shadow-2xl" style={{ transform: 'translateZ(50px)' }} />
              </div>
            </Tilt>
          </div>

          <h1 className="text-xl font-semibold text-center mb-4">Entrar</h1>
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="E-mail" className="w-full bg-slate-700 rounded px-3 mb-2 py-2 focus:ring-2 focus:ring-verde-vr outline-none transition-all" />
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Senha" className="w-full bg-slate-700 rounded mb-2 px-3 py-2 focus:ring-2 focus:ring-verde-vr outline-none transition-all" />
          {error && <div className="text-red-400 text-sm bg-red-900/20 p-2 rounded border border-red-500/20">{error}</div>}
          <button disabled={loading} className="w-full bg-verde-vr text-white font-bold rounded py-2 hover:bg-azul-vr/90 transition-colors shadow-inner shadow-verde-vr/20">{loading? 'Entrando...' : 'Entrar'}</button>
          <div className="text-sm opacity-80 text-center mt-4">Não tem conta? <Link to="/register" className="text-verde-vr hover:underline">Registrar</Link></div>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
