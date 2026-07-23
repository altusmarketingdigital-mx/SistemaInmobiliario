import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('Conectando...'); // Feedback visual mientras carga
    try {
      const response = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/admin');
    } catch (err) {
      console.error(err);
      if (!err.response) {
        setError('Error de conexión con el servidor backend.');
      } else if (err.response.status === 401) {
        setError('Credenciales inválidas. Verifica tu correo y contraseña.');
      } else {
        const errorData = err.response.data?.error;
        let errorMsg = 'Error interno del servidor (Revisa la conexión a Neon DB).';
        if (errorData) {
          errorMsg = typeof errorData === 'string' ? errorData : (errorData.message || JSON.stringify(errorData));
        }
        setError(errorMsg);
      }
    }
  };

  return (
    <div className="min-h-screen bg-stone-900 flex flex-col items-center justify-center p-4">
      {/* Background Decorators */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[30%] -left-[10%] w-[70%] h-[70%] rounded-full bg-red-900/20 blur-[120px]"></div>
        <div className="absolute bottom-0 right-0 w-[50%] h-[50%] rounded-full bg-[#b91c1c]/10 blur-[100px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 border border-white/20">
        <div className="text-center mb-10">
          <div className="mx-auto w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-[#b91c1c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-3xl font-['Outfit'] font-bold text-stone-900">Bienvenido</h2>
          <p className="text-stone-500 mt-2 text-sm">Ingresa tus credenciales para administrar el sistema</p>
        </div>

        {error && <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-2">Correo Electrónico</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#b91c1c] focus:ring-4 focus:ring-red-100 transition-all outline-none"
              placeholder="admin@1k6.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-2">Contraseña</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#b91c1c] focus:ring-4 focus:ring-red-100 transition-all outline-none"
              placeholder="••••••••"
              required
            />
          </div>
          <button 
            type="submit" 
            className="w-full py-3.5 bg-[#b91c1c] hover:bg-red-800 text-white font-bold rounded-xl shadow-lg shadow-red-900/30 transition-all transform hover:-translate-y-1 mt-4"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
}
