import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function Admin() {
  const [activeTab, setActiveTab] = useState('proyectos'); // 'proyectos', 'planos', 'lotes'
  
  // Data states
  const [lotes, setLotes] = useState([]);
  const [proyectos, setProyectos] = useState([]);
  
  // Modal states
  const [showProyectoModal, setShowProyectoModal] = useState(false);
  const [nuevoProyecto, setNuevoProyecto] = useState({ nombre: '', ubicacion: '', descripcion: '', logotipo_url: '' });
  
  const navigate = useNavigate();

  useEffect(() => {
    if (activeTab === 'lotes') fetchLotes();
    if (activeTab === 'proyectos') fetchProyectos();
  }, [activeTab]);

  const fetchLotes = async () => {
    try {
      const response = await api.get('/admin/lotes');
      setLotes(response.data);
    } catch (error) {
      handleAuthError(error);
    }
  };

  const fetchProyectos = async () => {
    try {
      const response = await api.get('/admin/proyectos');
      setProyectos(response.data);
    } catch (error) {
      handleAuthError(error);
    }
  };

  const handleAuthError = (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.removeItem('token');
      navigate('/login');
    }
    console.error("API Error", error);
  };

  const handleEstadoChange = async (id, nuevoEstado) => {
    try {
      await api.put(`/admin/lotes/${id}/estado`, { estado: nuevoEstado });
      fetchLotes();
    } catch (error) {
      console.error("Error updating estado", error);
    }
  };

  const handleCrearProyecto = async (e) => {
    e.preventDefault();
    try {
      await api.post('/admin/proyectos', nuevoProyecto);
      setShowProyectoModal(false);
      setNuevoProyecto({ nombre: '', ubicacion: '', descripcion: '', logotipo_url: '' });
      fetchProyectos();
    } catch (error) {
      console.error("Error creating project", error);
      alert("Error al crear el proyecto. Revisa la consola o verifica la conexión con Neon DB.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-stone-50 flex font-['Plus_Jakarta_Sans']">
      {/* Sidebar */}
      <aside className="w-64 bg-stone-900 text-white flex flex-col fixed h-full z-20">
        <div className="p-6 border-b border-stone-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#b91c1c] to-red-600 shadow-lg flex items-center justify-center">
            <span className="text-white font-['Outfit'] font-bold text-xl">1K6</span>
          </div>
          <div>
            <h2 className="font-bold text-sm leading-tight">Admin Panel</h2>
            <p className="text-stone-400 text-xs">Gestión Inmobiliaria</p>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <button 
            onClick={() => setActiveTab('proyectos')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${activeTab === 'proyectos' ? 'bg-[#b91c1c] text-white shadow-lg shadow-red-900/20' : 'text-stone-400 hover:bg-stone-800 hover:text-white'}`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
            Proyectos
          </button>
          
          <button 
            onClick={() => setActiveTab('planos')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${activeTab === 'planos' ? 'bg-[#b91c1c] text-white shadow-lg shadow-red-900/20' : 'text-stone-400 hover:bg-stone-800 hover:text-white'}`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
            Planos y Mapas
          </button>

          <button 
            onClick={() => setActiveTab('lotes')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${activeTab === 'lotes' ? 'bg-[#b91c1c] text-white shadow-lg shadow-red-900/20' : 'text-stone-400 hover:bg-stone-800 hover:text-white'}`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
            Inventario / Lotes
          </button>
        </nav>

        <div className="p-4 border-t border-stone-800">
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-stone-400 hover:bg-stone-800 hover:text-red-400 transition-all">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-64 p-10 bg-stone-50 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <header className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-3xl font-['Outfit'] font-bold text-stone-900 capitalize">Gestión de {activeTab}</h1>
              <p className="text-stone-500 mt-1">Panel de control y configuración del sistema.</p>
            </div>
            {activeTab === 'proyectos' && (
              <button onClick={() => setShowProyectoModal(true)} className="bg-[#b91c1c] text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-red-900/20 hover:-translate-y-0.5 transition-transform">
                + Nuevo Proyecto
              </button>
            )}
            {activeTab === 'planos' && (
              <button className="bg-[#b91c1c] text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-red-900/20 hover:-translate-y-0.5 transition-transform">
                Subir SVG
              </button>
            )}
          </header>

          {/* Tab Contents */}
          {activeTab === 'proyectos' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {proyectos.length === 0 ? (
                <div className="col-span-full bg-white rounded-2xl shadow-sm border border-stone-200 p-8 text-center text-stone-500">
                  <svg className="w-16 h-16 mx-auto text-stone-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                  Aún no has registrado ningún proyecto. Haz clic en "Nuevo Proyecto".
                </div>
              ) : (
                proyectos.map(p => (
                  <div key={p.id} className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6 flex flex-col group hover:shadow-md transition-shadow">
                    <div className="h-32 bg-stone-100 rounded-xl mb-4 overflow-hidden relative">
                      {p.logotipo_url ? (
                        <img src={p.logotipo_url} alt="Logo" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-stone-300">Sin Imagen</div>
                      )}
                    </div>
                    <h3 className="font-bold text-lg text-stone-900">{p.nombre}</h3>
                    <p className="text-[#b91c1c] text-sm font-medium mb-3">{p.ubicacion}</p>
                    <p className="text-stone-500 text-sm flex-1">{p.descripcion}</p>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'planos' && (
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-8 text-center text-stone-500">
              <svg className="w-16 h-16 mx-auto text-stone-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
              Interfaz de Carga de Planos SVG y Mapper UI (Próximamente)
            </div>
          )}

          {activeTab === 'lotes' && (
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-stone-50 border-b border-stone-200 text-stone-600">
                  <tr>
                    <th className="p-5 font-semibold text-sm">Código Lote</th>
                    <th className="p-5 font-semibold text-sm">Superficie (m²)</th>
                    <th className="p-5 font-semibold text-sm">Precio m²</th>
                    <th className="p-5 font-semibold text-sm">Estado Actual</th>
                    <th className="p-5 font-semibold text-sm">Acciones Rápidas</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {lotes.length === 0 ? (
                    <tr><td colSpan="5" className="p-8 text-center text-stone-500">No hay lotes en la base de datos o hubo un error de conexión con Neon.</td></tr>
                  ) : (
                    lotes.map(lote => (
                      <tr key={lote.id} className="hover:bg-stone-50 transition-colors group">
                        <td className="p-5 font-bold text-stone-900">{lote.codigo}</td>
                        <td className="p-5 text-stone-600">{lote.superficie_m2}</td>
                        <td className="p-5 font-medium text-emerald-600">${lote.precio_m2}</td>
                        <td className="p-5">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider
                            ${lote.estado === 'Disponible' ? 'bg-emerald-100 text-emerald-700' : 
                              lote.estado === 'Apartado' ? 'bg-amber-100 text-amber-700' : 
                              lote.estado === 'Vendido' ? 'bg-rose-100 text-rose-700' : 
                              'bg-stone-100 text-stone-700'}`}>
                            {lote.estado === 'Disponible' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>}
                            {lote.estado === 'Apartado' && <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>}
                            {lote.estado === 'Vendido' && <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>}
                            {lote.estado}
                          </span>
                        </td>
                        <td className="p-5">
                          <select 
                            className="w-full border border-stone-200 rounded-lg px-3 py-2 bg-white text-sm text-stone-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-shadow cursor-pointer"
                            value={lote.estado}
                            onChange={(e) => handleEstadoChange(lote.id, e.target.value)}
                          >
                            <option value="Disponible">Disponible</option>
                            <option value="Apartado">Apartado</option>
                            <option value="Vendido">Vendido</option>
                            <option value="Bloqueado">Bloqueado</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

        </div>
      </main>

      {/* MODAL NUEVO PROYECTO */}
      {showProyectoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl animate-in zoom-in-95">
            <h2 className="text-2xl font-bold text-stone-900 mb-6">Registrar Proyecto</h2>
            <form onSubmit={handleCrearProyecto} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">Nombre del Desarrollo</label>
                <input 
                  type="text" required
                  value={nuevoProyecto.nombre} onChange={e => setNuevoProyecto({...nuevoProyecto, nombre: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#b91c1c] focus:ring-2 focus:ring-red-100 outline-none"
                  placeholder="Ej: Villas de Alcalá"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">Ubicación</label>
                <input 
                  type="text" required
                  value={nuevoProyecto.ubicacion} onChange={e => setNuevoProyecto({...nuevoProyecto, ubicacion: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#b91c1c] focus:ring-2 focus:ring-red-100 outline-none"
                  placeholder="Ej: Zona Norte"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">Descripción Corta</label>
                <textarea 
                  required rows="3"
                  value={nuevoProyecto.descripcion} onChange={e => setNuevoProyecto({...nuevoProyecto, descripcion: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#b91c1c] focus:ring-2 focus:ring-red-100 outline-none"
                  placeholder="Detalles sobre amenidades, exclusividad..."
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">URL de Imagen/Render (Opcional)</label>
                <input 
                  type="url"
                  value={nuevoProyecto.logotipo_url} onChange={e => setNuevoProyecto({...nuevoProyecto, logotipo_url: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#b91c1c] focus:ring-2 focus:ring-red-100 outline-none"
                  placeholder="https://..."
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setShowProyectoModal(false)} className="px-5 py-2.5 rounded-xl font-semibold text-stone-500 hover:bg-stone-100">Cancelar</button>
                <button type="submit" className="px-5 py-2.5 rounded-xl font-bold bg-[#b91c1c] text-white hover:bg-red-800 shadow-lg shadow-red-900/20">Guardar Proyecto</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
