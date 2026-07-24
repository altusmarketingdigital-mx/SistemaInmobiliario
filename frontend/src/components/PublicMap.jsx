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
      <div className="min-h-screen bg-[#FDFDFD] flex flex-col items-center justify-center font-['Plus_Jakarta_Sans']">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 border-4 border-stone-100 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-red-600 rounded-full border-t-transparent animate-spin"></div>
        </div>
        <p className="mt-6 text-stone-400 font-semibold tracking-widest uppercase text-sm animate-pulse">Cargando Plano Maestro...</p>
      </div>
    );
  }

  if (!proyecto) {
    return <div className="min-h-screen bg-white flex items-center justify-center text-stone-500 font-['Outfit'] text-2xl">Proyecto no encontrado.</div>;
  }

  return (
    <div className="w-full h-screen relative flex bg-[#F8F9FA] overflow-hidden font-['Plus_Jakarta_Sans']">
      
      {/* FULLSCREEN MAP CANVAS */}
      <div className="absolute inset-0 z-0 flex items-center justify-center p-4 md:pl-[400px]">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] mix-blend-multiply"></div>
        
        {plano && plano.archivo_svg ? (
          <div className="relative w-full h-full max-w-6xl max-h-[800px] bg-white/50 backdrop-blur-3xl rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-white/60 p-4 md:p-12 animate-in fade-in zoom-in-95 duration-1000 flex items-center justify-center">
            <div 
              className="w-full h-full [&>svg]:w-full [&>svg]:h-full [&>svg]:object-contain [&>svg]:drop-shadow-2xl transition-transform duration-500 hover:scale-[1.02]" 
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
                if (e.altKey && firstId) {
                  alert("Modo Diagnóstico: El ID de esta figura es '" + firstId + "'.");
                }
              }}
            />
          </div>
        ) : (
          <div className="text-stone-400 font-medium text-lg bg-white/80 px-8 py-4 rounded-full shadow-sm border border-stone-200">
            Aún no hay un plano interactivo configurado.
          </div>
        )}
      </div>

      {/* FLOATING GLASS SIDEBAR */}
      <div className="absolute top-0 left-0 w-full md:w-[400px] h-auto md:h-full z-20 flex flex-col pointer-events-none p-4 md:p-6">
        <div className="bg-white/90 backdrop-blur-2xl rounded-[2.5rem] h-full shadow-[0_8px_40px_rgb(0,0,0,0.06)] border border-stone-100 p-8 flex flex-col pointer-events-auto overflow-y-auto">
          
          <Link to="/" className="inline-flex items-center gap-3 text-stone-400 hover:text-red-600 transition-colors mb-10 w-fit group">
            <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center group-hover:bg-red-50 transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            </div>
            <span className="font-bold text-sm tracking-wide">Volver a Desarrollos</span>
          </Link>
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-stone-100 border border-stone-200 mb-6 w-fit">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-stone-600 text-xs font-bold tracking-widest uppercase">Preventa Activa</span>
          </div>

          <h1 className="text-5xl font-['Outfit'] font-black text-stone-900 leading-[1.1] tracking-tight mb-6">
            {proyecto.nombre}
          </h1>
          
          <p className="text-stone-500 text-base leading-relaxed font-medium mb-12">
            Explora el mapa interactivo haciendo clic en los lotes. Selecciona tu espacio ideal y visualiza la plusvalía garantizada.
          </p>

          {/* Premium Legend */}
          <div className="mt-auto">
            <h3 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-4">Simbología del Plano</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100/50 transition-colors hover:bg-emerald-50">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-lg bg-emerald-500 shadow-[0_4px_12px_rgba(16,185,129,0.3)]"></div>
                  <span className="font-bold text-stone-700">Disponible</span>
                </div>
                <span className="text-emerald-600 text-xs font-bold px-2 py-1 bg-emerald-100 rounded-md">Clickeable</span>
              </div>
              
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-amber-50/50 border border-amber-100/50">
                <div className="w-5 h-5 rounded-lg bg-amber-400 shadow-[0_4px_12px_rgba(251,191,36,0.3)]"></div>
                <span className="font-bold text-stone-700">Apartado</span>
              </div>
              
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-rose-50/50 border border-rose-100/50">
                <div className="w-5 h-5 rounded-lg bg-rose-500 shadow-[0_4px_12px_rgba(244,63,94,0.3)]"></div>
                <span className="font-bold text-stone-700">Vendido</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* FLOATING QUOTE MODAL */}
      {selectedLote && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/20 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] border border-stone-100 p-8 md:p-10 animate-in zoom-in-95 slide-in-from-bottom-10 duration-500 overflow-hidden">
            
            {/* Minimalist Accents */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-bl-[100px] pointer-events-none"></div>
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-red-100 rounded-full blur-2xl pointer-events-none"></div>
            
            <button 
              onClick={() => setSelectedLote(null)} 
              className="absolute top-8 right-8 w-10 h-10 flex items-center justify-center rounded-full bg-stone-50 text-stone-400 hover:bg-stone-100 hover:text-stone-900 transition-colors z-10"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            <div className="mb-10 relative z-10 pt-2">
              <p className="text-red-600 font-bold tracking-widest text-xs uppercase mb-3">Lote Exclusivo</p>
              <h3 className="text-5xl font-['Outfit'] font-extrabold text-stone-900 tracking-tight">{selectedLote.codigo}</h3>
            </div>
            
            <div className="space-y-3 mb-10 relative z-10">
              <div className="flex justify-between items-center p-5 bg-[#FAFAFA] rounded-2xl border border-stone-100">
                <span className="text-stone-500 font-semibold text-sm">Superficie Total</span>
                <span className="font-extrabold text-stone-900 text-xl">{selectedLote.superficie} <span className="text-stone-400 text-sm">m²</span></span>
              </div>
              <div className="flex justify-between items-center p-5 bg-[#FAFAFA] rounded-2xl border border-stone-100">
                <span className="text-stone-500 font-semibold text-sm">Precio por m²</span>
                <span className="font-extrabold text-stone-900 text-xl"><span className="text-stone-400 text-sm">$</span>{selectedLote.precio_m2.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center p-6 bg-stone-900 rounded-2xl shadow-xl shadow-stone-900/10 mt-4 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-r from-stone-800 to-transparent opacity-50"></div>
                <span className="text-stone-300 font-semibold relative z-10">Inversión Total</span>
                <span className="font-black text-white text-3xl relative z-10">${(selectedLote.superficie * selectedLote.precio_m2).toLocaleString()}</span>
              </div>
            </div>
            
            <button className="relative w-full overflow-hidden rounded-2xl bg-red-600 text-white font-bold text-lg py-5 shadow-[0_10px_20px_-10px_rgba(220,38,38,0.5)] transition-all hover:-translate-y-1 hover:shadow-[0_15px_30px_-10px_rgba(220,38,38,0.6)] flex items-center justify-center gap-3 group">
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
              <svg className="w-6 h-6 relative z-10" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.527 1.059 3.597l-.966 3.12 3.177-.962c1.033.667 2.214 1.022 3.504 1.022h.004c3.181 0 5.767-2.586 5.768-5.766-.003-3.18-2.588-5.777-5.778-5.777zm2.784 8.281c-.135.378-.795.73-1.125.767-.315.035-.745.061-1.282-.113-.335-.108-.826-.296-1.464-.567-1.354-.574-2.227-1.455-2.921-2.47-.07-.101-.137-.205-.2-.312-.663-.996-.648-1.927-.174-2.551.242-.321.614-.492.936-.492.148 0 .274.004.385.011.168.01.27.025.39.308.152.356.518 1.266.564 1.358.046.091.077.199.015.321-.061.122-.092.198-.184.305-.091.107-.193.228-.276.305-.092.084-.191.176-.084.361.107.184.475.782 1.018 1.265.7.625 1.291.821 1.476.904.184.084.292.076.4-.046.107-.122.46-.535.583-.718.122-.184.245-.153.414-.092.168.061 1.066.504 1.25.596.184.092.306.138.352.214.046.076.046.444-.092.822z"/></svg>
              <span className="relative z-10">Separar Lote Ahora</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
