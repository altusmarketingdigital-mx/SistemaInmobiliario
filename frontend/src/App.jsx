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
            <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-3 group transition-transform hover:scale-105">
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
              <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className={`font-semibold text-sm transition-colors ${location.pathname === '/' ? 'text-red-600' : 'text-stone-500 hover:text-stone-900'}`}>
                Desarrollos
              </Link>
              <Link to="/admin" className={`font-semibold text-sm transition-colors ${location.pathname === '/admin' ? 'text-red-600' : 'text-stone-500 hover:text-stone-900'}`}>
                Backoffice
              </Link>
              <button 
                onClick={() => {
                  if (location.pathname !== '/') {
                    window.location.href = '/#/';
                    setTimeout(() => {
                      document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
                    }, 500);
                  } else {
                    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="px-6 py-2.5 rounded-full bg-black text-white font-semibold text-sm hover:bg-neutral-800 transition-all shadow-lg hover:shadow-red-900/20 active:scale-95">
                Contacto
              </button>
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

      {/* FLOATING WHATSAPP BUTTON */}
      {!isAdminRoute && (
        <a 
          href="https://wa.me/523312345678" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="fixed bottom-8 right-8 z-50 flex items-center justify-center w-16 h-16 bg-green-500 text-white rounded-full shadow-[0_10px_25px_rgba(34,197,94,0.5)] hover:scale-110 hover:-translate-y-2 transition-all duration-300 group"
        >
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.527 1.059 3.597l-.966 3.12 3.177-.962c1.033.667 2.214 1.022 3.504 1.022h.004c3.181 0 5.767-2.586 5.768-5.766-.003-3.18-2.588-5.777-5.778-5.777zm2.784 8.281c-.135.378-.795.73-1.125.767-.315.035-.745.061-1.282-.113-.335-.108-.826-.296-1.464-.567-1.354-.574-2.227-1.455-2.921-2.47-.07-.101-.137-.205-.2-.312-.663-.996-.648-1.927-.174-2.551.242-.321.614-.492.936-.492.148 0 .274.004.385.011.168.01.27.025.39.308.152.356.518 1.266.564 1.358.046.091.077.199.015.321-.061.122-.092.198-.184.305-.091.107-.193.228-.276.305-.092.084-.191.176-.084.361.107.184.475.782 1.018 1.265.7.625 1.291.821 1.476.904.184.084.292.076.4-.046.107-.122.46-.535.583-.718.122-.184.245-.153.414-.092.168.061 1.066.504 1.25.596.184.092.306.138.352.214.046.076.046.444-.092.822z"/>
          </svg>
          <span className="absolute right-20 px-4 py-2 bg-stone-900 text-white text-sm font-bold rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Chatea con nosotros
          </span>
        </a>
      )}

    </div>
  );
}

export default App;
