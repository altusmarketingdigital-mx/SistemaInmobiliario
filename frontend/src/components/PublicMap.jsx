import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

// Mocks simulando la info que vendrá del backend según el ID del proyecto
const mockProyectosInfo = {
  '1': { nombre: 'Villas La Corona', colorTheme: 'from-red-600 to-rose-400' },
  '2': { nombre: 'Paseo del Valle', colorTheme: 'from-[#b91c1c] to-red-500' },
  '3': { nombre: 'Altos de San Ángel', colorTheme: 'from-stone-400 to-stone-300' },
};

const mockLotes = [
  { id: 1, codigo: 'L01', estado: 'Disponible', superficie: 150.5, precio_m2: 3200 },
  { id: 2, codigo: 'L02', estado: 'Apartado', superficie: 160.0, precio_m2: 3200 },
  { id: 3, codigo: 'L03', estado: 'Vendido', superficie: 200.0, precio_m2: 3500 },
];

export default function PublicMap() {
  const { id } = useParams();
  const [selectedLote, setSelectedLote] = useState(null);

  const proyecto = mockProyectosInfo[id] || mockProyectosInfo['1'];

  const handleLoteClick = (loteCodigo) => {
    const loteInfo = mockLotes.find(l => l.codigo === loteCodigo);
    if (loteInfo && loteInfo.estado === 'Disponible') {
      setSelectedLote(loteInfo);
    }
  };

  const getLoteClass = (codigo) => {
    const lote = mockLotes.find(l => l.codigo === codigo);
    const base = "transition-all duration-500 cursor-pointer hover:stroke-white hover:stroke-[3px] hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] ";
    if (!lote) return base + "fill-stone-300";
    
    switch(lote.estado) {
      case 'Disponible': return base + "fill-emerald-500 hover:fill-emerald-400";
      case 'Apartado': return base + "fill-amber-400";
      case 'Vendido': return base + "fill-rose-500 cursor-not-allowed hover:stroke-none hover:drop-shadow-none";
      default: return base + "fill-stone-400";
    }
  };

  return (
    <div className="w-full flex-1 relative flex bg-stone-900 overflow-hidden">
      {/* Background Decorators */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[30%] -left-[10%] w-[70%] h-[70%] rounded-full bg-red-900/20 blur-[120px]"></div>
        <div className="absolute top-[40%] -right-[10%] w-[50%] h-[50%] rounded-full bg-[#b91c1c]/10 blur-[100px]"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </div>

      <div className="relative w-full h-full flex flex-col xl:flex-row items-center justify-center p-6 lg:p-12 gap-8">
        
        {/* Left Side: Text & Legend */}
        <div className="w-full xl:w-1/3 flex flex-col justify-center z-10 space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div>
            <Link to="/" className="inline-flex items-center gap-2 text-stone-400 hover:text-red-400 transition-colors mb-8 font-medium text-sm">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
              Volver a Proyectos
            </Link>
            
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 backdrop-blur-md mb-6">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-emerald-400 text-xs font-bold tracking-wide uppercase">Etapa 1 Disponible</span>
            </div>
            <h2 className="text-5xl lg:text-7xl font-['Outfit'] font-extrabold text-white leading-[1.1] tracking-tight">
              {proyecto.nombre.split(' ')[0]} <br/> 
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${proyecto.colorTheme}`}>
                {proyecto.nombre.split(' ').slice(1).join(' ')}
              </span>
            </h2>
            <p className="mt-6 text-stone-400 text-lg leading-relaxed max-w-md">
              Explora nuestro plano interactivo y descubre los espacios disponibles en la zona más exclusiva.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 pt-4 border-t border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-md bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)]"></div>
              <span className="text-sm font-medium text-stone-300">Disponible</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-md bg-amber-400"></div>
              <span className="text-sm font-medium text-stone-300">Apartado</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-md bg-rose-500"></div>
              <span className="text-sm font-medium text-stone-300">Vendido</span>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Map */}
        <div className="w-full xl:w-2/3 h-[50vh] min-h-[400px] xl:h-auto flex items-center justify-center relative z-10 animate-in fade-in zoom-in-95 duration-1000 delay-200">
          <div className="relative w-full max-w-4xl p-2 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-3xl shadow-2xl">
            <div className="absolute inset-0 rounded-[2.5rem] ring-1 ring-inset ring-white/10 pointer-events-none"></div>
            
            <svg viewBox="0 0 800 400" className="w-full h-auto drop-shadow-2xl rounded-[2rem] overflow-hidden">
              {/* Fake Roads / Background Elements */}
              <rect width="100%" height="100%" fill="rgba(255,255,255,0.02)" />
              <path d="M 50 200 L 750 200" stroke="rgba(255,255,255,0.1)" strokeWidth="40" strokeLinecap="round" />
              <path d="M 50 200 L 750 200" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeDasharray="10 10" strokeLinecap="round" />
              
              {/* Lote 1 */}
              <g className="group">
                <polygon 
                  points="100,50 250,50 250,180 100,180" 
                  className={getLoteClass('L01')}
                  onClick={() => handleLoteClick('L01')}
                />
                <text x="175" y="125" textAnchor="middle" fill="white" className="font-['Outfit'] font-bold text-2xl pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity">L01</text>
              </g>
              
              {/* Lote 2 */}
              <g className="group">
                <polygon 
                  points="260,50 410,50 410,180 260,180" 
                  className={getLoteClass('L02')}
                  onClick={() => handleLoteClick('L02')}
                />
                <text x="335" y="125" textAnchor="middle" fill="white" className="font-['Outfit'] font-bold text-2xl pointer-events-none opacity-80">L02</text>
              </g>

              {/* Lote 3 */}
              <g className="group">
                <polygon 
                  points="420,50 570,50 570,180 420,180" 
                  className={getLoteClass('L03')}
                  onClick={() => handleLoteClick('L03')}
                />
                <text x="495" y="125" textAnchor="middle" fill="white" className="font-['Outfit'] font-bold text-2xl pointer-events-none opacity-80">L03</text>
              </g>
            </svg>
          </div>
        </div>

      </div>

      {/* Modern Floating Quote Modal */}
      {selectedLote && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="relative w-full max-w-md bg-white rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-white p-8 animate-in zoom-in-95 slide-in-from-bottom-8 duration-500 overflow-hidden">
            {/* Modal Decorator */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-100 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
            
            <button 
              onClick={() => setSelectedLote(null)} 
              className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            <div className="mb-8">
              <p className="text-emerald-600 font-bold tracking-wider text-xs uppercase mb-2">Terreno Disponible</p>
              <h3 className="text-4xl font-['Outfit'] font-extrabold text-slate-900">Lote {selectedLote.codigo}</h3>
            </div>
            
            <div className="space-y-4 mb-8 relative z-10">
              <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
                <span className="text-slate-500 font-medium">Superficie Total</span>
                <span className="font-bold text-slate-900 text-lg">{selectedLote.superficie} m²</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
                <span className="text-slate-500 font-medium">Inversión por m²</span>
                <span className="font-bold text-slate-900 text-lg">${selectedLote.precio_m2.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center p-5 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-lg mt-2">
                <span className="text-slate-300 font-medium">Inversión Total</span>
                <span className="font-bold text-white text-2xl">${(selectedLote.superficie * selectedLote.precio_m2).toLocaleString()}</span>
              </div>
            </div>
            
            <button className="relative w-full group overflow-hidden rounded-2xl bg-emerald-500 text-white font-bold text-lg py-4 shadow-[0_10px_20px_-10px_rgba(16,185,129,0.5)] transition-all hover:-translate-y-1 hover:shadow-[0_15px_30px_-10px_rgba(16,185,129,0.6)] active:translate-y-0 flex items-center justify-center gap-3">
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
              <svg className="w-6 h-6 relative z-10" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.527 1.059 3.597l-.966 3.12 3.177-.962c1.033.667 2.214 1.022 3.504 1.022h.004c3.181 0 5.767-2.586 5.768-5.766-.003-3.18-2.588-5.777-5.778-5.777zm2.784 8.281c-.135.378-.795.73-1.125.767-.315.035-.745.061-1.282-.113-.335-.108-.826-.296-1.464-.567-1.354-.574-2.227-1.455-2.921-2.47-.07-.101-.137-.205-.2-.312-.663-.996-.648-1.927-.174-2.551.242-.321.614-.492.936-.492.148 0 .274.004.385.011.168.01.27.025.39.308.152.356.518 1.266.564 1.358.046.091.077.199.015.321-.061.122-.092.198-.184.305-.091.107-.193.228-.276.305-.092.084-.191.176-.084.361.107.184.475.782 1.018 1.265.7.625 1.291.821 1.476.904.184.084.292.076.4-.046.107-.122.46-.535.583-.718.122-.184.245-.153.414-.092.168.061 1.066.504 1.25.596.184.092.306.138.352.214.046.076.046.444-.092.822z"/></svg>
              <span className="relative z-10">Cotizar por WhatsApp</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
