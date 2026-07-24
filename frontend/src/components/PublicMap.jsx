import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api';

export default function PublicMap() {
  const { id } = useParams();
  const [selectedLote, setSelectedLote] = useState(null);
  const [data, setData] = useState({ proyecto: null, plano: null, lotes: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlanoInfo = async () => {
      try {
        const response = await api.get(`/proyectos/${id}/plano`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching map info", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlanoInfo();
  }, [id]);

  const proyecto = data.proyecto;
  const plano = data.plano;
  const dbLotes = data.lotes;

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center font-['Plus_Jakarta_Sans']">
        <div className="w-12 h-12 border-4 border-stone-200 border-t-red-600 rounded-full animate-spin"></div>
        <p className="mt-4 text-stone-500 font-medium text-sm tracking-wide">Cargando...</p>
      </div>
    );
  }

  if (!proyecto) {
    return <div className="min-h-screen bg-stone-50 flex items-center justify-center text-stone-500 font-medium">Proyecto no encontrado.</div>;
  }

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col font-['Plus_Jakarta_Sans']">
      
      {/* HEADER BAR */}
      <header className="bg-white border-b border-stone-200 px-8 py-4 flex items-center justify-between sticky top-0 z-40">
        <Link to="/" className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-900 transition-colors font-semibold text-sm">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Volver a Desarrollos
        </Link>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-emerald-700 text-xs font-bold tracking-widest uppercase">Preventa Activa</span>
        </div>
      </header>

      {/* SPLIT CONTENT */}
      <main className="flex-1 flex flex-col lg:flex-row w-full max-w-[1600px] mx-auto p-4 lg:p-8 gap-8">
        
        {/* LEFT COLUMN: INFO */}
        <div className="w-full lg:w-5/12 flex flex-col justify-center space-y-8 lg:pr-8 animate-in fade-in slide-in-from-left-8 duration-700">
          <div>
            <h1 className="text-5xl lg:text-7xl font-['Outfit'] font-black text-stone-900 leading-[1.1] tracking-tight">
              {proyecto.nombre}
            </h1>
            <p className="mt-6 text-stone-500 text-lg leading-relaxed font-medium">
              Explora nuestro plano interactivo y descubre los espacios disponibles en la zona más exclusiva. Haz clic en un lote para ver su cotización.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-200 space-y-4">
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-4">Simbología</h3>
            <div className="flex items-center justify-between p-3 rounded-xl hover:bg-stone-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50"></div>
                <span className="font-semibold text-stone-700">Disponible</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl hover:bg-stone-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-amber-400 shadow-sm shadow-amber-400/50"></div>
                <span className="font-semibold text-stone-700">Apartado</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl hover:bg-stone-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-rose-500 shadow-sm shadow-rose-500/50"></div>
                <span className="font-semibold text-stone-700">Vendido</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: MAP */}
        <div className="w-full lg:w-7/12 min-h-[500px] bg-white rounded-[2.5rem] shadow-sm border border-stone-200 p-6 flex flex-col items-center justify-center relative animate-in fade-in slide-in-from-right-8 duration-700 delay-100">
          {plano && plano.archivo_svg ? (
            <div 
              className="w-full h-full min-h-[500px] flex items-center justify-center [&>svg]:w-full [&>svg]:h-full [&>svg]:max-h-[700px] [&>svg]:object-contain transition-transform duration-300 hover:scale-[1.01]" 
              dangerouslySetInnerHTML={{ __html: plano.archivo_svg }}
              onClick={(e) => {
                let target = e.target;
                let found = false;
                let firstId = null;
                while (target && target !== e.currentTarget && !found) {
                  if (target.id) {
                    if (!firstId) firstId = target.id;
                    const loteInfo = dbLotes.find(l => String(l.codigo).trim() === String(target.id).trim());
                    if (loteInfo && loteInfo.estado === 'Disponible') {
                      setSelectedLote(loteInfo);
                      found = true;
                    }
                  }
                  target = target.parentNode;
                }
              }}
            />
          ) : (
            <div className="text-stone-400 font-medium text-lg">
              Aún no hay un plano interactivo configurado.
            </div>
          )}
        </div>
      </main>

      {/* FLOATING QUOTE MODAL */}
      {selectedLote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-sm bg-white rounded-[2rem] shadow-2xl border border-stone-100 p-8 animate-in zoom-in-95 slide-in-from-bottom-8 duration-300">
            <button 
              onClick={() => setSelectedLote(null)} 
              className="absolute top-6 right-6 text-stone-400 hover:text-stone-900 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            <div className="mb-8">
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs uppercase tracking-wider mb-4">
                Disponible
              </span>
              <h3 className="text-4xl font-['Outfit'] font-extrabold text-stone-900 tracking-tight">Lote {selectedLote.codigo}</h3>
            </div>
            
            <div className="space-y-3 mb-8">
              <div className="flex justify-between items-center p-4 bg-stone-50 rounded-2xl border border-stone-100">
                <span className="text-stone-500 font-medium text-sm">Superficie Total</span>
                <span className="font-bold text-stone-900 text-lg">{selectedLote.superficie} m²</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-stone-50 rounded-2xl border border-stone-100">
                <span className="text-stone-500 font-medium text-sm">Precio por m²</span>
                <span className="font-bold text-stone-900 text-lg">${selectedLote.precio_m2.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center p-5 bg-stone-900 rounded-2xl shadow-md mt-4">
                <span className="text-stone-300 font-medium">Inversión Total</span>
                <span className="font-black text-white text-2xl">${(selectedLote.superficie * selectedLote.precio_m2).toLocaleString()}</span>
              </div>
            </div>
            
            <a href={`https://wa.me/523312345678?text=Hola,%20me%20interesa%20el%20lote%20${selectedLote.codigo}%20de%20${selectedLote.superficie}m2%20que%20vi%20en%20el%20plano.`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full bg-red-600 text-white font-bold text-lg py-4 rounded-2xl transition-all hover:bg-red-700 active:scale-95 shadow-[0_10px_20px_-10px_rgba(220,38,38,0.5)]">
              Contactar Asesor
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
