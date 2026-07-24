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
    <div className="w-full min-h-screen bg-[#FDFDFD] text-stone-900 font-['Plus_Jakarta_Sans'] selection:bg-red-500/20">
      
      {/* HERO SECTION */}
      <div className="relative w-full min-h-[60vh] md:min-h-[70vh] flex items-center justify-center overflow-hidden bg-white py-24 pb-36">
        {/* Background Gradients & Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-red-50 via-white to-white"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-red-100 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-100 bg-red-50/50 backdrop-blur-md mb-8 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
            <span className="text-red-700 text-xs font-bold tracking-widest uppercase">Inversión Inteligente</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-['Outfit'] font-black text-stone-900 tracking-tight leading-tight mb-6">
            Construye tu futuro <br className="hidden md:block" /> con <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-900">1K6</span>
          </h1>
          <p className="text-stone-500 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            Explora nuestros desarrollos exclusivos, visualiza disponibilidad en tiempo real mediante mapas interactivos y asegura la mejor plusvalía del mercado.
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce flex flex-col items-center text-stone-400">
          <span className="text-xs tracking-widest uppercase mb-2 font-semibold">Explorar</span>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* PROJECTS SECTION */}
      <div className="max-w-7xl mx-auto px-6 py-24 relative z-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-['Outfit'] font-bold text-stone-900 tracking-tight mb-4">
              Desarrollos Activos
            </h2>
            <p className="text-stone-500 text-lg max-w-xl font-medium">
              Selecciona el proyecto de tu interés para conocer la distribución de lotes, precios y reservar tu espacio.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-3 bg-stone-50 p-1.5 rounded-2xl border border-stone-200">
            <button className="px-6 py-2.5 rounded-xl bg-white text-stone-900 text-sm font-bold shadow-sm border border-stone-100">Todos</button>
            <button className="px-6 py-2.5 rounded-xl text-stone-500 hover:text-stone-900 hover:bg-white text-sm font-semibold transition-colors">Preventa</button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-32">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 border-4 border-stone-100 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-red-600 rounded-full border-t-transparent animate-spin"></div>
            </div>
          </div>
        ) : proyectos.length === 0 ? (
          <div className="text-center py-32 bg-white/50 backdrop-blur-sm rounded-3xl border border-stone-200/50 shadow-sm">
            <h3 className="text-2xl font-bold text-stone-900 mb-3">Próximamente</h3>
            <p className="text-stone-500 font-medium">Nuevos desarrollos están siendo configurados. Vuelve pronto.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {proyectos.map((proyecto, idx) => (
              <Link 
                to={`/proyecto/${proyecto.id}`}
                key={proyecto.id} 
                className={`group block relative bg-white/80 backdrop-blur-xl rounded-[2rem] overflow-hidden border border-stone-200/80 hover:border-red-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(220,38,38,0.08)] animate-in fade-in zoom-in-95 fill-mode-both`}
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* Image Header */}
                <div className="h-64 overflow-hidden relative bg-stone-100">
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 via-transparent to-transparent z-10 opacity-60 group-hover:opacity-30 transition-opacity duration-500"></div>
                  {proyecto.logotipo_url ? (
                    <img 
                      src={proyecto.logotipo_url} 
                      alt={proyecto.nombre} 
                      className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-stone-100 text-stone-400">
                      <svg className="w-12 h-12 mb-3 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      <span className="text-sm font-semibold tracking-wide">FOTO PENDIENTE</span>
                    </div>
                  )}
                  
                  {/* Badge */}
                  <div className="absolute top-5 right-5 z-20 bg-white/90 backdrop-blur-md border border-stone-100 px-4 py-1.5 rounded-full flex items-center gap-2 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-xs font-bold text-stone-700 tracking-wide uppercase">Disponible</span>
                  </div>
                </div>
                
                {/* Content Body */}
                <div className="p-8 relative">
                  <div className="absolute top-0 right-8 -translate-y-1/2 w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 group-hover:-translate-y-6 transition-all duration-300 shadow-lg shadow-red-600/40 z-20">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </div>
                  
                  <p className="text-red-600 font-bold text-xs tracking-widest uppercase mb-3">{proyecto.ubicacion}</p>
                  <h3 className="text-2xl font-['Outfit'] font-bold text-stone-900 mb-3 group-hover:text-red-700 transition-colors">{proyecto.nombre}</h3>
                  <p className="text-stone-500 text-sm leading-relaxed mb-6 line-clamp-3 font-medium">
                    {proyecto.descripcion}
                  </p>
                  
                  <div className="pt-6 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-stone-900 font-bold text-sm">Explorar Mapa</span>
                    <span className="text-stone-400 text-sm group-hover:text-red-600 transition-colors">➔</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* CONTACT FORM SECTION */}
      <div className="bg-stone-50 py-24 relative z-10 border-t border-stone-200" id="contacto">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-['Outfit'] font-black text-stone-900 tracking-tight mb-4">
              ¿Listo para invertir?
            </h2>
            <p className="text-stone-500 text-lg font-medium">
              Déjanos tus datos y un asesor especializado se pondrá en contacto contigo a la brevedad.
            </p>
          </div>
          
          <div className="bg-white rounded-3xl shadow-xl shadow-stone-200/50 p-8 md:p-12 border border-stone-100">
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("¡Mensaje enviado con éxito! Un asesor te contactará pronto."); }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-stone-700">Nombre Completo</label>
                  <input type="text" placeholder="Ej. Juan Pérez" className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-stone-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-stone-700">Teléfono (WhatsApp)</label>
                  <input type="tel" placeholder="Ej. 33 1234 5678" className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-stone-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all" required />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-stone-700">Correo Electrónico</label>
                <input type="email" placeholder="tu@correo.com" className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-stone-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-stone-700">Mensaje (Opcional)</label>
                <textarea rows="4" placeholder="Me interesa saber más sobre..." className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-stone-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all resize-none"></textarea>
              </div>
              <button type="submit" className="w-full bg-red-600 text-white font-bold text-lg py-4 rounded-xl hover:bg-red-700 active:scale-95 transition-all shadow-lg shadow-red-600/30">
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* PREMIUM FOOTER */}
      <footer className="bg-white border-t border-stone-200 mt-20 pt-16 pb-8">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
            
            {/* Column 1: Brand */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <span className="text-4xl font-['Outfit'] font-black text-stone-900 tracking-tighter">1K6</span>
                <div className="flex flex-col ml-1 leading-tight">
                  <span className="text-[10px] font-bold text-red-600 tracking-widest uppercase">Constructora</span>
                  <span className="text-[10px] font-bold text-red-600 tracking-widest uppercase">& Inmobiliaria</span>
                </div>
              </div>
              <p className="text-stone-500 text-sm leading-relaxed font-medium">
                Desarrollamos espacios exclusivos que garantizan plusvalía, lujo y la mejor calidad de vida para tu familia y tus inversiones.
              </p>
            </div>

            {/* Column 2: Enlaces Rápidos */}
            <div>
              <h4 className="font-['Outfit'] font-bold text-stone-900 mb-6 uppercase tracking-wider text-sm">Explorar</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-stone-500 hover:text-red-600 transition-colors text-sm font-medium">Todos los Proyectos</a></li>
                <li><a href="#" className="text-stone-500 hover:text-red-600 transition-colors text-sm font-medium">Mapa Interactivo</a></li>
                <li><a href="#" className="text-stone-500 hover:text-red-600 transition-colors text-sm font-medium">Modelos de Inversión</a></li>
                <li><a href="#" className="text-stone-500 hover:text-red-600 transition-colors text-sm font-medium">Testimonios</a></li>
              </ul>
            </div>

            {/* Column 3: Contacto */}
            <div>
              <h4 className="font-['Outfit'] font-bold text-stone-900 mb-6 uppercase tracking-wider text-sm">Contacto</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-red-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  <span className="text-stone-500 text-sm font-medium">Av. Américas 1500, Punto Sao Paulo, Piso 15, Guadalajara, Jal.</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-red-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  <span className="text-stone-500 text-sm font-medium">+52 (33) 1234 5678</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-red-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  <span className="text-stone-500 text-sm font-medium">contacto@1k6.com</span>
                </li>
              </ul>
            </div>

            {/* Column 4: Backoffice */}
            <div>
              <h4 className="font-['Outfit'] font-bold text-stone-900 mb-6 uppercase tracking-wider text-sm">Administración</h4>
              <p className="text-stone-500 text-sm leading-relaxed font-medium mb-6">
                Acceso exclusivo para el personal corporativo y asesores inmobiliarios.
              </p>
              <Link to="/admin" className="inline-flex items-center justify-center gap-2 w-full bg-stone-900 text-white font-bold text-sm py-3 px-6 rounded-xl hover:bg-red-700 transition-colors shadow-lg">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                Entrar al Backoffice
              </Link>
            </div>
          </div>
          
          {/* Bottom Bar */}
          <div className="pt-8 border-t border-stone-200 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-stone-400 text-sm font-medium">
              &copy; {new Date().getFullYear()} 1K6 Constructora e Inmobiliaria. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-stone-400 hover:text-red-600 transition-colors text-sm font-medium">Aviso de Privacidad</a>
              <a href="#" className="text-stone-400 hover:text-red-600 transition-colors text-sm font-medium">Términos y Condiciones</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
