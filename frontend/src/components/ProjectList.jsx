import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

export default function ProjectList() {
  const [proyectos, setProyectos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProyectos = async () => {
      try {
        const response = await api.get('/proyectos');
        setProyectos(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error al cargar los proyectos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProyectos();
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#0a0a0a] text-stone-200 font-['Plus_Jakarta_Sans'] selection:bg-red-500/30">
      
      {/* HERO SECTION */}
      <div className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background Gradients & Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-red-900/20 via-[#0a0a0a] to-[#0a0a0a]"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay"></div>
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-red-600/10 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-900/30 bg-red-950/20 backdrop-blur-md mb-8">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            <span className="text-red-400 text-xs font-bold tracking-widest uppercase">Inversión Inteligente</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-['Outfit'] font-black text-white tracking-tight leading-tight mb-6">
            Construye tu futuro <br className="hidden md:block" /> con <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">Altus ERP</span>
          </h1>
          <p className="text-stone-400 text-lg md:text-xl max-w-2xl mx-auto font-light">
            Explora nuestros desarrollos exclusivos, visualiza disponibilidad en tiempo real mediante mapas interactivos y asegura la mejor plusvalía del mercado.
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce flex flex-col items-center text-stone-500">
          <span className="text-xs tracking-widest uppercase mb-2">Explorar</span>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* PROJECTS SECTION */}
      <div className="max-w-7xl mx-auto px-6 py-24 relative z-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-['Outfit'] font-bold text-white tracking-tight mb-4">
              Desarrollos Activos
            </h2>
            <p className="text-stone-500 text-lg max-w-xl">
              Selecciona el proyecto de tu interés para conocer la distribución de lotes, precios y reservar tu espacio.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-3 bg-stone-900 p-1.5 rounded-2xl border border-stone-800">
            <button className="px-6 py-2.5 rounded-xl bg-stone-800 text-white text-sm font-bold shadow-sm">Todos</button>
            <button className="px-6 py-2.5 rounded-xl text-stone-400 hover:text-white text-sm font-semibold transition-colors">Preventa</button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-32">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 border-4 border-stone-800 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-red-600 rounded-full border-t-transparent animate-spin"></div>
            </div>
          </div>
        ) : proyectos.length === 0 ? (
          <div className="text-center py-32 bg-stone-900/30 backdrop-blur-sm rounded-3xl border border-stone-800/50">
            <h3 className="text-2xl font-bold text-white mb-3">Próximamente</h3>
            <p className="text-stone-500">Nuevos desarrollos están siendo configurados. Vuelve pronto.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {proyectos.map((proyecto, idx) => (
              <Link 
                to={`/proyecto/${proyecto.id}`}
                key={proyecto.id} 
                className={`group block relative bg-stone-900/40 backdrop-blur-xl rounded-[2rem] overflow-hidden border border-stone-800/60 hover:border-red-500/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(220,38,38,0.1)] animate-in fade-in zoom-in-95 fill-mode-both`}
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* Image Header */}
                <div className="h-64 overflow-hidden relative bg-stone-950">
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent z-10 opacity-80 group-hover:opacity-40 transition-opacity duration-500"></div>
                  {proyecto.logotipo_url ? (
                    <img 
                      src={proyecto.logotipo_url} 
                      alt={proyecto.nombre} 
                      className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-stone-900 text-stone-600">
                      <svg className="w-12 h-12 mb-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      <span className="text-sm font-semibold tracking-wide">FOTO PENDIENTE</span>
                    </div>
                  )}
                  
                  {/* Badge */}
                  <div className="absolute top-5 right-5 z-20 bg-black/40 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="text-xs font-bold text-white tracking-wide uppercase">Disponible</span>
                  </div>
                </div>
                
                {/* Content Body */}
                <div className="p-8 relative">
                  <div className="absolute top-0 right-8 -translate-y-1/2 w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 group-hover:-translate-y-6 transition-all duration-300 shadow-lg shadow-red-600/40 z-20">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </div>
                  
                  <p className="text-red-400 font-bold text-xs tracking-widest uppercase mb-3">{proyecto.ubicacion}</p>
                  <h3 className="text-2xl font-['Outfit'] font-bold text-white mb-3 group-hover:text-red-400 transition-colors">{proyecto.nombre}</h3>
                  <p className="text-stone-400 text-sm leading-relaxed mb-6 line-clamp-3">
                    {proyecto.descripcion}
                  </p>
                  
                  <div className="pt-6 border-t border-stone-800/50 flex items-center justify-between">
                    <span className="text-white font-semibold text-sm">Explorar Mapa</span>
                    <span className="text-stone-500 text-sm group-hover:text-red-400 transition-colors">➔</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* FOOTER PUSH */}
      <div className="py-12 border-t border-stone-900 text-center text-stone-600 text-sm">
        &copy; {new Date().getFullYear()} Altus ERP. Todos los derechos reservados.
      </div>
    </div>
  );
}
