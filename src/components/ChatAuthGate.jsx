import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase.js';

const ChatAuthGate = ({ onAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      if (data.session) onAuthenticated(data.session.user);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, sess) => {
      setSession(sess);
      if (sess) onAuthenticated(sess.user);
    });
    return () => sub.subscription.unsubscribe();
  }, [onAuthenticated]);

  async function signUp() {
    setLoading(true); setError(null);
    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (error) setError(error.message);
  }

  async function signIn() {
    setLoading(true); setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) setError(error.message);
  }

  async function signOut() {
    await supabase.auth.signOut();
  }

  if (session) {
    return (
      <div className="fixed bottom-6 right-6 flex items-center gap-3 bg-slate-900/80 border border-white/20 rounded-xl p-2 text-white backdrop-blur">
        <span className="text-sm">Logado: {session.user.email || session.user.id}</span>
        <button onClick={signOut} className="px-2 py-1 bg-slate-700 rounded">Sair</button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 bg-slate-900/80 border border-white/20 rounded-xl shadow-xl p-3 text-white backdrop-blur">
      <div className="font-semibold mb-2">Entrar no Chat</div>
      <div className="flex flex-col gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-slate-800 border border-white/20 rounded px-2 py-1"
          placeholder="Seu e-mail"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-slate-800 border border-white/20 rounded px-2 py-1"
          placeholder="Sua senha"
        />
        {error && <div className="text-red-400 text-sm">{error}</div>}
        <div className="flex gap-2">
          <button disabled={loading} onClick={signIn} className="px-3 py-1 bg-verde-vr text-black rounded">Entrar</button>
          <button disabled={loading} onClick={signUp} className="px-3 py-1 bg-slate-700 rounded">Criar conta</button>
        </div>
      </div>
    </div>
  );
};

export default ChatAuthGate;
