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
    <div className="w-full min-h-[calc(100vh-5rem)] bg-[#F8FAFC] py-16 px-6 relative overflow-hidden">
      {/* Elementos Decorativos */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-100 rounded-full blur-[100px] opacity-60 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-rose-50 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <span className="text-[#b91c1c] font-bold tracking-wider text-sm uppercase mb-3 block">Nuestros Desarrollos</span>
          <h2 className="text-4xl md:text-6xl font-['Outfit'] font-extrabold text-stone-900 tracking-tight">
            Encuentra tu próximo <br /> gran proyecto
          </h2>
          <p className="mt-6 text-stone-500 text-lg max-w-2xl mx-auto">
            Selecciona uno de nuestros exclusivos fraccionamientos para explorar el mapa interactivo y descubrir la disponibilidad en tiempo real.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#b91c1c]"></div>
          </div>
        ) : proyectos.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-stone-100">
            <h3 className="text-2xl font-bold text-stone-900 mb-2">Próximamente</h3>
            <p className="text-stone-500">Estamos preparando nuevos desarrollos. ¡Vuelve pronto!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {proyectos.map((proyecto, idx) => (
              <div 
                key={proyecto.id} 
                className={`group relative bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-stone-100 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] animate-in fade-in zoom-in-95 fill-mode-both`}
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                <div className="h-64 overflow-hidden relative bg-stone-100">
                  <div className="absolute inset-0 bg-stone-900/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                  {proyecto.logotipo_url ? (
                    <img 
                      src={proyecto.logotipo_url} 
                      alt={proyecto.nombre} 
                      className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-stone-300">
                      <svg className="w-12 h-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      <span className="text-sm font-semibold">Imagen Pendiente</span>
                    </div>
                  )}
                  <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#b91c1c] animate-pulse"></span>
                    <span className="text-xs font-bold text-stone-700">Preventa Activa</span>
                  </div>
                </div>
                
                <div className="p-8">
                  <p className="text-[#b91c1c] font-semibold text-sm mb-2">{proyecto.ubicacion}</p>
                  <h3 className="text-2xl font-['Outfit'] font-bold text-stone-900 mb-3">{proyecto.nombre}</h3>
                  <p className="text-stone-500 text-sm leading-relaxed mb-8">
                    {proyecto.descripcion}
                  </p>
                  
                  <Link 
                    to={`/proyecto/${proyecto.id}`}
                    className="inline-flex w-full items-center justify-center gap-2 bg-stone-50 text-stone-900 font-semibold py-3.5 rounded-xl transition-all duration-300 group-hover:bg-[#b91c1c] group-hover:text-white"
                  >
                    Ver Mapa Interactivo
                    <svg className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
