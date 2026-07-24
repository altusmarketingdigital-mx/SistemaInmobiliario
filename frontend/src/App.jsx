import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import ProjectList from './components/ProjectList';
import PublicMap from './components/PublicMap';
import Admin from './components/Admin';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin') || location.pathname === '/login';

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-['Plus_Jakarta_Sans'] text-slate-900 selection:bg-red-600 selection:text-white flex flex-col">
      {/* Ocultar Navbar genérico en las rutas de Admin/Login que tienen su propio layout */}
      {!isAdminRoute && (
        <nav className="fixed w-full z-50 transition-all duration-300 bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.03)]">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group transition-transform hover:scale-105">
              <div className="relative flex flex-col items-center">
                {/* Techo rojo del logo */}
                <svg viewBox="0 0 100 40" className="w-16 h-5 text-[#b91c1c] fill-current relative z-10 translate-y-1 drop-shadow-sm">
                  <path d="M10 40 L50 5 L90 40 L75 40 L50 18 L25 40 Z" />
                </svg>
                {/* 1K6 */}
                <span className="text-4xl font-black text-black leading-none tracking-tighter">1K6</span>
              </div>
              <div className="flex flex-col justify-center translate-y-1">
                <span className="text-[#b91c1c] font-bold text-[0.7rem] leading-none tracking-wider">CONSTRUCTORA</span>
                <span className="text-[#b91c1c] font-bold text-[0.7rem] leading-none tracking-wider mt-0.5">E INMOBILIARIA</span>
              </div>
            </Link>
            
            <div className="hidden md:flex items-center gap-8">
              <Link to="/" className={`font-semibold text-sm transition-colors ${location.pathname === '/' ? 'text-red-600' : 'text-stone-500 hover:text-stone-900'}`}>
                Desarrollos
              </Link>
              <Link to="/admin" className={`font-semibold text-sm transition-colors ${location.pathname === '/admin' ? 'text-red-600' : 'text-stone-500 hover:text-stone-900'}`}>
                Backoffice
              </Link>
              <a href="https://wa.me/523312345678" target="_blank" rel="noopener noreferrer" className="px-6 py-2.5 rounded-full bg-black text-white font-semibold text-sm hover:bg-neutral-800 transition-all shadow-lg hover:shadow-red-900/20 active:scale-95">
                Contacto
              </a>
            </div>
          </div>
        </nav>
      )}

      <main className={`flex-1 flex flex-col ${!isAdminRoute ? 'pt-20' : ''}`}>
        <Routes>
          <Route path="/" element={<ProjectList />} />
          <Route path="/proyecto/:id" element={<PublicMap />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/*" element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          } />
        </Routes>
      </main>
    </div>
  );
}

export default App;
