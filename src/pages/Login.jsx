import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../app/AuthContext.jsx';

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
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white p-4">
      <form onSubmit={onSubmit} className="w-full max-w-sm bg-slate-800 border border-white/10 rounded-xl p-6 space-y-3">
        <h1 className="text-xl font-semibold">Entrar</h1>
        <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="E-mail" className="w-full bg-slate-700 rounded px-3 py-2" />
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Senha" className="w-full bg-slate-700 rounded px-3 py-2" />
        {error && <div className="text-red-400 text-sm">{error}</div>}
        <button disabled={loading} className="w-full bg-verde-vr text-black rounded py-2">{loading? 'Entrando...' : 'Entrar'}</button>
        <div className="text-sm opacity-80">Não tem conta? <Link to="/register" className="text-verde-vr">Registrar</Link></div>
      </form>
    </div>
  );
};

export default Login;
