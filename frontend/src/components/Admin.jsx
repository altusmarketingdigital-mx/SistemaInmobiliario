import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function Admin() {
  const [activeTab, setActiveTab] = useState('proyectos'); // 'proyectos', 'planos', 'lotes'
  
  const [lotes, setLotes] = useState([]);
  const [proyectos, setProyectos] = useState([]);
  const [planos, setPlanos] = useState([]);
  const [compradores, setCompradores] = useState([]);
  const [propietarios, setPropietarios] = useState([]);
  const [operaciones, setOperaciones] = useState([]);
  
  const [agentes, setAgentes] = useState([]);
  const [inversionistas, setInversionistas] = useState([]);
  const [comisiones, setComisiones] = useState([]);
  
  const [bancos, setBancos] = useState([]);
  const [transacciones, setTransacciones] = useState([]);
  const [cobranza, setCobranza] = useState([]);
  
  const [empleados, setEmpleados] = useState([]);
  const [nomina, setNomina] = useState([]);
  const [configuracion, setConfiguracion] = useState({ company_name: '', company_rfc: '' });
  
  // Modal states
  const [showProyectoModal, setShowProyectoModal] = useState(false);
  const [nuevoProyecto, setNuevoProyecto] = useState({ nombre: '', ubicacion: '', descripcion: '', logotipo_url: '' });
  
  const [showPlanoModal, setShowPlanoModal] = useState(false);
  const [nuevoPlano, setNuevoPlano] = useState({ proyecto_id: '', nombre_etapa: '', archivo_svg: '' });
  const [isUploading, setIsUploading] = useState(false);
  
  const [showLoteModal, setShowLoteModal] = useState(false);
  const [nuevoLote, setNuevoLote] = useState({ plano_id: '', codigo: '', superficie_m2: '', precio_m2: '', tipo_inmueble: 'Terreno', operacion_tipo: 'Venta', propietario_id: '' });

  const [showCompradorModal, setShowCompradorModal] = useState(false);
  const [nuevoComprador, setNuevoComprador] = useState({ nombre: '', telefono: '', email: '', direccion: '', rfc: '' });

  const [showPropietarioModal, setShowPropietarioModal] = useState(false);
  const [nuevoPropietario, setNuevoPropietario] = useState({ nombre: '', telefono: '', email: '', direccion: '', rfc: '' });

  const [showOperacionModal, setShowOperacionModal] = useState(false);
  const [nuevaOperacion, setNuevaOperacion] = useState({ lote_id: '', comprador_id: '', agente_id: '', tipo_operacion: 'Venta', monto: '', notas: '' });
  
  const [showAgenteModal, setShowAgenteModal] = useState(false);
  const [nuevoAgente, setNuevoAgente] = useState({ nombre: '', telefono: '', email: '', jerarquia: 'Promotor', porcentaje_comision: 0, jefe_id: '' });

  const [showInversionistaModal, setShowInversionistaModal] = useState(false);
  const [nuevoInversionista, setNuevoInversionista] = useState({ nombre: '', telefono: '', email: '', total_invertido: 0 });
  
  const [showBancoModal, setShowBancoModal] = useState(false);
  const [nuevoBanco, setNuevoBanco] = useState({ nombre: '', cuenta: '', clabe: '', saldo: 0 });

  const [showTransaccionModal, setShowTransaccionModal] = useState(false);
  const [nuevaTransaccion, setNuevaTransaccion] = useState({ tipo: 'Ingreso', monto: '', concepto: '', banco_id: '', fecha: '' });

  const [showCobranzaModal, setShowCobranzaModal] = useState(false);
  const [nuevaCobranza, setNuevaCobranza] = useState({ operacion_id: '', monto_esperado: '', fecha_vencimiento: '', notas: '' });

  const [showPagarCobranzaModal, setShowPagarCobranzaModal] = useState(false);
  const [cobranzaAPagar, setCobranzaAPagar] = useState({ id: '', banco_id: '' });
  
  const [showEmpleadoModal, setShowEmpleadoModal] = useState(false);
  const [nuevoEmpleado, setNuevoEmpleado] = useState({ nombre: '', rfc: '', puesto: '', salario_base: '' });

  const [showNominaModal, setShowNominaModal] = useState(false);
  const [nuevaNomina, setNuevaNomina] = useState({ empleado_id: '', periodo: '', monto_pagado: '', banco_id: '' });
  
  const navigate = useNavigate();

  useEffect(() => {
    // Siempre cargar todo para que los selects en los modales tengan datos
    fetchProyectos();
    fetchPlanos();
    fetchLotes();
    fetchCompradores();
    fetchPropietarios();
    fetchOperaciones();
    fetchAgentes();
    fetchInversionistas();
    fetchComisiones();
    fetchBancos();
    fetchTransacciones();
    fetchCobranza();
    fetchEmpleados();
    fetchNomina();
    fetchConfiguracion();
  }, []);

  useEffect(() => {
    if (activeTab === 'lotes') fetchLotes();
    if (activeTab === 'proyectos') fetchProyectos();
    if (activeTab === 'planos') fetchPlanos();
    if (activeTab === 'compradores') fetchCompradores();
    if (activeTab === 'propietarios') fetchPropietarios();
    if (activeTab === 'operaciones') fetchOperaciones();
    if (activeTab === 'agentes') fetchAgentes();
    if (activeTab === 'inversionistas') fetchInversionistas();
    if (activeTab === 'comisiones') fetchComisiones();
    if (activeTab === 'bancos') fetchBancos();
    if (activeTab === 'transacciones') fetchTransacciones();
    if (activeTab === 'cobranza') fetchCobranza();
    if (activeTab === 'empleados') fetchEmpleados();
    if (activeTab === 'nomina') fetchNomina();
    if (activeTab === 'configuracion') fetchConfiguracion();
  }, [activeTab]);

  const fetchLotes = async () => {
    try {
      const response = await api.get('/admin/lotes');
      setLotes(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      handleAuthError(error);
    }
  };

  const fetchProyectos = async () => {
    try {
      const response = await api.get('/admin/proyectos');
      setProyectos(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      handleAuthError(error);
    }
  };

  const fetchPlanos = async () => {
    try {
      const response = await api.get('/admin/planos');
      setPlanos(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      handleAuthError(error);
    }
  };

  const fetchCompradores = async () => {
    try {
      const response = await api.get('/admin/compradores');
      setCompradores(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      handleAuthError(error);
    }
  };

  const fetchPropietarios = async () => {
    try {
      const response = await api.get('/admin/propietarios');
      setPropietarios(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      handleAuthError(error);
    }
  };

  const fetchOperaciones = async () => {
    try {
      const response = await api.get('/admin/operaciones');
      setOperaciones(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      handleAuthError(error);
    }
  };

  const fetchAgentes = async () => {
    try {
      const response = await api.get('/admin/agentes');
      setAgentes(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      handleAuthError(error);
    }
  };

  const fetchInversionistas = async () => {
    try {
      const response = await api.get('/admin/inversionistas');
      setInversionistas(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      handleAuthError(error);
    }
  };

  const fetchComisiones = async () => {
    try {
      const response = await api.get('/admin/comisiones');
      setComisiones(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      handleAuthError(error);
    }
  };

  const fetchBancos = async () => {
    try {
      const response = await api.get('/admin/bancos');
      setBancos(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      handleAuthError(error);
    }
  };

  const fetchTransacciones = async () => {
    try {
      const response = await api.get('/admin/transacciones');
      setTransacciones(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      handleAuthError(error);
    }
  };

  const fetchCobranza = async () => {
    try {
      const response = await api.get('/admin/cobranza');
      setCobranza(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      handleAuthError(error);
    }
  };

  const fetchEmpleados = async () => {
    try {
      const response = await api.get('/admin/empleados');
      setEmpleados(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      handleAuthError(error);
    }
  };

  const fetchNomina = async () => {
    try {
      const response = await api.get('/admin/nomina');
      setNomina(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      handleAuthError(error);
    }
  };

  const fetchConfiguracion = async () => {
    try {
      const response = await api.get('/admin/configuracion');
      setConfiguracion(response.data || { company_name: '', company_rfc: '' });
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

  const handleUpdateImage = async (proyectoId, file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        await api.put(`/admin/proyectos/${proyectoId}/imagen`, { logotipo_url: reader.result });
        fetchProyectos();
      } catch (error) {
        console.error("Error updating image", error);
        alert("Error al subir la imagen.");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSVGUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setNuevoPlano({ ...nuevoPlano, archivo_svg: event.target.result });
      };
      reader.readAsText(file);
    }
  };

  const handleSubirPlano = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    try {
      await api.post('/admin/planos', nuevoPlano);
      setShowPlanoModal(false);
      setNuevoPlano({ proyecto_id: '', nombre_etapa: '', archivo_svg: '' });
      fetchPlanos();
      alert("Plano guardado con éxito.");
    } catch (error) {
      console.error("Error al subir plano", error);
      alert("Error al guardar plano. Verifica la consola.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleCrearLote = async (e) => {
    e.preventDefault();
    try {
      await api.post('/admin/lotes', nuevoLote);
      setShowLoteModal(false);
      setNuevoLote({ plano_id: '', codigo: '', superficie_m2: '', precio_m2: '', tipo_inmueble: 'Terreno', operacion_tipo: 'Venta', propietario_id: '' });
      fetchLotes();
    } catch (error) {
      console.error("Error creating lote", error);
      alert(error.response?.data?.error || "Error al crear el lote. Revisa la consola.");
    }
  };

  const handleCrearComprador = async (e) => {
    e.preventDefault();
    try {
      await api.post('/admin/compradores', nuevoComprador);
      setShowCompradorModal(false);
      setNuevoComprador({ nombre: '', telefono: '', email: '', direccion: '', rfc: '' });
      fetchCompradores();
    } catch (error) {
      console.error(error);
      alert("Error al crear comprador.");
    }
  };

  const handleCrearPropietario = async (e) => {
    e.preventDefault();
    try {
      await api.post('/admin/propietarios', nuevoPropietario);
      setShowPropietarioModal(false);
      setNuevoPropietario({ nombre: '', telefono: '', email: '', direccion: '', rfc: '' });
      fetchPropietarios();
    } catch (error) {
      console.error(error);
      alert("Error al crear propietario.");
    }
  };

  const handleCrearOperacion = async (e) => {
    e.preventDefault();
    try {
      await api.post('/admin/operaciones', nuevaOperacion);
      setShowOperacionModal(false);
      setNuevaOperacion({ lote_id: '', comprador_id: '', agente_id: '', tipo_operacion: 'Venta', monto: '', notas: '' });
      fetchOperaciones();
      fetchComisiones(); // Refresh comisiones in case one was created
      fetchLotes(); // Refresh lotes since their status might change
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.error || "Error al crear operacion.");
    }
  };

  const handleCrearAgente = async (e) => {
    e.preventDefault();
    try {
      await api.post('/admin/agentes', nuevoAgente);
      setShowAgenteModal(false);
      setNuevoAgente({ nombre: '', telefono: '', email: '', jerarquia: 'Promotor', porcentaje_comision: 0, jefe_id: '' });
      fetchAgentes();
    } catch (error) {
      console.error(error);
      alert("Error al crear agente.");
    }
  };

  const handleCrearInversionista = async (e) => {
    e.preventDefault();
    try {
      await api.post('/admin/inversionistas', nuevoInversionista);
      setShowInversionistaModal(false);
      setNuevoInversionista({ nombre: '', telefono: '', email: '', total_invertido: 0 });
      fetchInversionistas();
    } catch (error) {
      console.error(error);
      alert("Error al crear inversionista.");
    }
  };

  const handlePagarComision = async (id) => {
    if (!window.confirm("¿Confirmar pago de comisión?")) return;
    try {
      await api.put(`/admin/comisiones/${id}/estado`, { estado: 'Pagada' });
      fetchComisiones();
    } catch (error) {
      console.error(error);
      alert("Error al pagar comisión.");
    }
  };

  const handleCrearBanco = async (e) => {
    e.preventDefault();
    try {
      await api.post('/admin/bancos', nuevoBanco);
      setShowBancoModal(false);
      setNuevoBanco({ nombre: '', cuenta: '', clabe: '', saldo: 0 });
      fetchBancos();
    } catch (error) {
      console.error(error);
      alert("Error al crear banco.");
    }
  };

  const handleCrearTransaccion = async (e) => {
    e.preventDefault();
    try {
      await api.post('/admin/transacciones', nuevaTransaccion);
      setShowTransaccionModal(false);
      setNuevaTransaccion({ tipo: 'Ingreso', monto: '', concepto: '', banco_id: '', fecha: '' });
      fetchTransacciones();
      fetchBancos(); // Refresh bank balances
    } catch (error) {
      console.error(error);
      alert("Error al crear transaccion.");
    }
  };

  const handleCrearCobranza = async (e) => {
    e.preventDefault();
    try {
      await api.post('/admin/cobranza', nuevaCobranza);
      setShowCobranzaModal(false);
      setNuevaCobranza({ operacion_id: '', monto_esperado: '', fecha_vencimiento: '', notas: '' });
      fetchCobranza();
    } catch (error) {
      console.error(error);
      alert("Error al crear registro de cobranza.");
    }
  };

  const handlePagarCobranza = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/admin/cobranza/${cobranzaAPagar.id}/pagar`, { banco_id: cobranzaAPagar.banco_id });
      setShowPagarCobranzaModal(false);
      setCobranzaAPagar({ id: '', banco_id: '' });
      fetchCobranza();
      fetchTransacciones();
      fetchBancos();
    } catch (error) {
      console.error(error);
      alert("Error al pagar cobranza.");
    }
  };

  const handleCrearEmpleado = async (e) => {
    e.preventDefault();
    try {
      await api.post('/admin/empleados', nuevoEmpleado);
      setShowEmpleadoModal(false);
      setNuevoEmpleado({ nombre: '', rfc: '', puesto: '', salario_base: '' });
      fetchEmpleados();
    } catch (error) {
      console.error(error);
      alert("Error al crear empleado.");
    }
  };

  const handleCrearNomina = async (e) => {
    e.preventDefault();
    try {
      await api.post('/admin/nomina', nuevaNomina);
      setShowNominaModal(false);
      setNuevaNomina({ empleado_id: '', periodo: '', monto_pagado: '', banco_id: '' });
      fetchNomina();
      fetchTransacciones();
      fetchBancos();
    } catch (error) {
      console.error(error);
      alert("Error al registrar nómina.");
    }
  };

  const handleGuardarConfiguracion = async (clave, valor) => {
    try {
      await api.put(`/admin/configuracion/${clave}`, { valor });
      fetchConfiguracion();
      alert("Configuración guardada exitosamente.");
    } catch (error) {
      console.error(error);
      alert("Error al guardar configuración.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
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
          
          <button 
            onClick={() => setActiveTab('compradores')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${activeTab === 'compradores' ? 'bg-[#b91c1c] text-white shadow-lg shadow-red-900/20' : 'text-stone-400 hover:bg-stone-800 hover:text-white'}`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            Compradores
          </button>

          <button 
            onClick={() => setActiveTab('propietarios')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${activeTab === 'propietarios' ? 'bg-[#b91c1c] text-white shadow-lg shadow-red-900/20' : 'text-stone-400 hover:bg-stone-800 hover:text-white'}`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
            Propietarios
          </button>

          <button 
            onClick={() => setActiveTab('operaciones')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${activeTab === 'operaciones' ? 'bg-[#b91c1c] text-white shadow-lg shadow-red-900/20' : 'text-stone-400 hover:bg-stone-800 hover:text-white'}`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2-2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
            Operaciones
          </button>

          <button 
            onClick={() => setActiveTab('agentes')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${activeTab === 'agentes' ? 'bg-[#b91c1c] text-white shadow-lg shadow-red-900/20' : 'text-stone-400 hover:bg-stone-800 hover:text-white'}`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            Agentes y Ventas
          </button>

          <button 
            onClick={() => setActiveTab('inversionistas')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${activeTab === 'inversionistas' ? 'bg-[#b91c1c] text-white shadow-lg shadow-red-900/20' : 'text-stone-400 hover:bg-stone-800 hover:text-white'}`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Inversionistas
          </button>

          <button 
            onClick={() => setActiveTab('comisiones')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${activeTab === 'comisiones' ? 'bg-[#b91c1c] text-white shadow-lg shadow-red-900/20' : 'text-stone-400 hover:bg-stone-800 hover:text-white'}`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z" /></svg>
            Comisiones
          </button>

          <div className="pt-4 mt-4 border-t border-stone-800">
            <h3 className="px-4 text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Finanzas</h3>
            
            <button 
              onClick={() => setActiveTab('bancos')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${activeTab === 'bancos' ? 'bg-[#b91c1c] text-white shadow-lg shadow-red-900/20' : 'text-stone-400 hover:bg-stone-800 hover:text-white'}`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
              Bancos
            </button>

            <button 
              onClick={() => setActiveTab('transacciones')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${activeTab === 'transacciones' ? 'bg-[#b91c1c] text-white shadow-lg shadow-red-900/20' : 'text-stone-400 hover:bg-stone-800 hover:text-white'}`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
              Ingresos y Egresos
            </button>

            <button 
              onClick={() => setActiveTab('cobranza')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${activeTab === 'cobranza' ? 'bg-[#b91c1c] text-white shadow-lg shadow-red-900/20' : 'text-stone-400 hover:bg-stone-800 hover:text-white'}`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Cobranza
            </button>
          </div>

          <div className="pt-4 mt-4 border-t border-stone-800">
            <h3 className="px-4 text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Empresa</h3>
            
            <button 
              onClick={() => setActiveTab('empleados')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${activeTab === 'empleados' ? 'bg-[#b91c1c] text-white shadow-lg shadow-red-900/20' : 'text-stone-400 hover:bg-stone-800 hover:text-white'}`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              Empleados Base
            </button>

            <button 
              onClick={() => setActiveTab('nomina')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${activeTab === 'nomina' ? 'bg-[#b91c1c] text-white shadow-lg shadow-red-900/20' : 'text-stone-400 hover:bg-stone-800 hover:text-white'}`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              Nómina
            </button>

            <button 
              onClick={() => setActiveTab('configuracion')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${activeTab === 'configuracion' ? 'bg-[#b91c1c] text-white shadow-lg shadow-red-900/20' : 'text-stone-400 hover:bg-stone-800 hover:text-white'}`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              Configuración
            </button>
          </div>
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
              <button onClick={() => setShowPlanoModal(true)} className="bg-[#b91c1c] text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-red-900/20 hover:-translate-y-0.5 transition-transform">
                Subir SVG
              </button>
            )}
            {activeTab === 'lotes' && (
              <button onClick={() => setShowLoteModal(true)} className="bg-[#b91c1c] text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-red-900/20 hover:-translate-y-0.5 transition-transform">
                + Nuevo Inmueble
              </button>
            )}
            {activeTab === 'compradores' && (
              <button onClick={() => setShowCompradorModal(true)} className="bg-[#b91c1c] text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-red-900/20 hover:-translate-y-0.5 transition-transform">
                + Nuevo Comprador
              </button>
            )}
            {activeTab === 'propietarios' && (
              <button onClick={() => setShowPropietarioModal(true)} className="bg-[#b91c1c] text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-red-900/20 hover:-translate-y-0.5 transition-transform">
                + Nuevo Propietario
              </button>
            )}
            {activeTab === 'operaciones' && (
              <button onClick={() => setShowOperacionModal(true)} className="bg-[#b91c1c] text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-red-900/20 hover:-translate-y-0.5 transition-transform">
                + Registrar Operación
              </button>
            )}
            {activeTab === 'agentes' && (
              <button onClick={() => setShowAgenteModal(true)} className="bg-[#b91c1c] text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-red-900/20 hover:-translate-y-0.5 transition-transform">
                + Nuevo Agente
              </button>
            )}
            {activeTab === 'inversionistas' && (
              <button onClick={() => setShowInversionistaModal(true)} className="bg-[#b91c1c] text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-red-900/20 hover:-translate-y-0.5 transition-transform">
                + Nuevo Inversionista
              </button>
            )}
            {activeTab === 'bancos' && (
              <button onClick={() => setShowBancoModal(true)} className="bg-[#b91c1c] text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-red-900/20 hover:-translate-y-0.5 transition-transform">
                + Nuevo Banco
              </button>
            )}
            {activeTab === 'transacciones' && (
              <button onClick={() => setShowTransaccionModal(true)} className="bg-[#b91c1c] text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-red-900/20 hover:-translate-y-0.5 transition-transform">
                + Nueva Transacción
              </button>
            )}
            {activeTab === 'cobranza' && (
              <button onClick={() => setShowCobranzaModal(true)} className="bg-[#b91c1c] text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-red-900/20 hover:-translate-y-0.5 transition-transform">
                + Registrar Cobranza
              </button>
            )}
            {activeTab === 'empleados' && (
              <button onClick={() => setShowEmpleadoModal(true)} className="bg-[#b91c1c] text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-red-900/20 hover:-translate-y-0.5 transition-transform">
                + Registrar Empleado
              </button>
            )}
            {activeTab === 'nomina' && (
              <button onClick={() => setShowNominaModal(true)} className="bg-[#b91c1c] text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-red-900/20 hover:-translate-y-0.5 transition-transform">
                + Pagar Nómina
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
                    <div className="h-32 bg-stone-100 rounded-xl mb-4 overflow-hidden relative group/img cursor-pointer" onClick={() => document.getElementById(`upload-${p.id}`).click()}>
                      {p.logotipo_url ? (
                        <img src={p.logotipo_url} alt="Logo" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-stone-400 font-medium text-sm">Clic para añadir foto</div>
                      )}
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity">
                        <span className="text-white text-xs font-bold bg-black/50 px-3 py-1 rounded-full">Cambiar Foto</span>
                      </div>
                      <input id={`upload-${p.id}`} type="file" accept="image/*" className="hidden" onChange={(e) => handleUpdateImage(p.id, e.target.files[0])} />
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {planos.length === 0 ? (
                <div className="col-span-full bg-white rounded-2xl shadow-sm border border-stone-200 p-8 text-center text-stone-500">
                  <svg className="w-16 h-16 mx-auto text-stone-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
                  Aún no has subido ningún plano. Haz clic en "Subir SVG".
                </div>
              ) : (
                planos.map(plano => {
                  const pAsociado = proyectos.find(p => p.id === plano.proyecto_id);
                  return (
                    <div key={plano.id} className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6 flex flex-col group">
                      <div className="h-48 bg-stone-50 rounded-xl mb-4 overflow-hidden relative border border-stone-100 flex items-center justify-center p-4">
                        <div className="w-full h-full [&>svg]:w-full [&>svg]:h-full [&>svg]:object-contain" dangerouslySetInnerHTML={{ __html: plano.archivo_svg }}></div>
                      </div>
                      <h3 className="font-bold text-lg text-stone-900">{plano.nombre_etapa}</h3>
                      <p className="text-[#b91c1c] text-sm font-medium">{pAsociado ? pAsociado.nombre : 'Proyecto Desconocido'}</p>
                    </div>
                  );
                })
              )}
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

          {activeTab === 'compradores' && (
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-stone-50 border-b border-stone-200 text-stone-600">
                  <tr>
                    <th className="p-5 font-semibold text-sm">Nombre</th>
                    <th className="p-5 font-semibold text-sm">Teléfono</th>
                    <th className="p-5 font-semibold text-sm">Email</th>
                    <th className="p-5 font-semibold text-sm">RFC</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {compradores.length === 0 ? (
                    <tr><td colSpan="4" className="p-8 text-center text-stone-500">No hay compradores registrados.</td></tr>
                  ) : (
                    compradores.map(c => (
                      <tr key={c.id} className="hover:bg-stone-50 transition-colors group">
                        <td className="p-5 font-bold text-stone-900">{c.nombre}</td>
                        <td className="p-5 text-stone-600">{c.telefono}</td>
                        <td className="p-5 text-stone-600">{c.email}</td>
                        <td className="p-5 text-stone-600">{c.rfc}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'propietarios' && (
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-stone-50 border-b border-stone-200 text-stone-600">
                  <tr>
                    <th className="p-5 font-semibold text-sm">Nombre</th>
                    <th className="p-5 font-semibold text-sm">Teléfono</th>
                    <th className="p-5 font-semibold text-sm">Email</th>
                    <th className="p-5 font-semibold text-sm">Dirección</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {propietarios.length === 0 ? (
                    <tr><td colSpan="4" className="p-8 text-center text-stone-500">No hay propietarios registrados.</td></tr>
                  ) : (
                    propietarios.map(p => (
                      <tr key={p.id} className="hover:bg-stone-50 transition-colors group">
                        <td className="p-5 font-bold text-stone-900">{p.nombre}</td>
                        <td className="p-5 text-stone-600">{p.telefono}</td>
                        <td className="p-5 text-stone-600">{p.email}</td>
                        <td className="p-5 text-stone-600">{p.direccion}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'operaciones' && (
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-stone-50 border-b border-stone-200 text-stone-600">
                  <tr>
                    <th className="p-5 font-semibold text-sm">Lote</th>
                    <th className="p-5 font-semibold text-sm">Comprador</th>
                    <th className="p-5 font-semibold text-sm">Tipo</th>
                    <th className="p-5 font-semibold text-sm">Monto</th>
                    <th className="p-5 font-semibold text-sm">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {operaciones.length === 0 ? (
                    <tr><td colSpan="5" className="p-8 text-center text-stone-500">No hay operaciones registradas.</td></tr>
                  ) : (
                    operaciones.map(o => (
                      <tr key={o.id} className="hover:bg-stone-50 transition-colors group">
                        <td className="p-5 font-bold text-stone-900">{o.lote_codigo}</td>
                        <td className="p-5 text-stone-600">{o.comprador_nombre}</td>
                        <td className="p-5 text-stone-600">
                          <span className="px-2 py-1 rounded bg-stone-100 text-xs font-bold uppercase">{o.tipo_operacion}</span>
                        </td>
                        <td className="p-5 font-medium text-emerald-600">${o.monto}</td>
                        <td className="p-5">
                          <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs font-bold uppercase">{o.estado}</span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'agentes' && (
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-stone-50 border-b border-stone-200 text-stone-600">
                  <tr>
                    <th className="p-5 font-semibold text-sm">Nombre</th>
                    <th className="p-5 font-semibold text-sm">Jerarquía</th>
                    <th className="p-5 font-semibold text-sm">% Comisión</th>
                    <th className="p-5 font-semibold text-sm">Jefe Directo</th>
                    <th className="p-5 font-semibold text-sm">Contacto</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {agentes.length === 0 ? (
                    <tr><td colSpan="5" className="p-8 text-center text-stone-500">No hay agentes registrados.</td></tr>
                  ) : (
                    agentes.map(a => (
                      <tr key={a.id} className="hover:bg-stone-50 transition-colors group">
                        <td className="p-5 font-bold text-stone-900">{a.nombre}</td>
                        <td className="p-5">
                          <span className={`px-2 py-1 rounded text-xs font-bold uppercase
                            ${a.jerarquia === 'Gerente' ? 'bg-purple-100 text-purple-700' : 
                              a.jerarquia === 'Coordinador' ? 'bg-blue-100 text-blue-700' : 
                              'bg-stone-100 text-stone-700'}`}>
                            {a.jerarquia}
                          </span>
                        </td>
                        <td className="p-5 text-emerald-600 font-bold">{a.porcentaje_comision}%</td>
                        <td className="p-5 text-stone-500 text-sm">{a.jefe_nombre || '-'}</td>
                        <td className="p-5 text-stone-600 text-sm">{a.telefono} <br/> {a.email}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'inversionistas' && (
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-stone-50 border-b border-stone-200 text-stone-600">
                  <tr>
                    <th className="p-5 font-semibold text-sm">Nombre</th>
                    <th className="p-5 font-semibold text-sm">Teléfono</th>
                    <th className="p-5 font-semibold text-sm">Email</th>
                    <th className="p-5 font-semibold text-sm">Total Invertido</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {inversionistas.length === 0 ? (
                    <tr><td colSpan="4" className="p-8 text-center text-stone-500">No hay inversionistas registrados.</td></tr>
                  ) : (
                    inversionistas.map(i => (
                      <tr key={i.id} className="hover:bg-stone-50 transition-colors group">
                        <td className="p-5 font-bold text-stone-900">{i.nombre}</td>
                        <td className="p-5 text-stone-600">{i.telefono}</td>
                        <td className="p-5 text-stone-600">{i.email}</td>
                        <td className="p-5 font-medium text-emerald-600">${i.total_invertido}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'comisiones' && (
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-stone-50 border-b border-stone-200 text-stone-600">
                  <tr>
                    <th className="p-5 font-semibold text-sm">Lote</th>
                    <th className="p-5 font-semibold text-sm">Agente</th>
                    <th className="p-5 font-semibold text-sm">Monto ($)</th>
                    <th className="p-5 font-semibold text-sm">Estado</th>
                    <th className="p-5 font-semibold text-sm">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {comisiones.length === 0 ? (
                    <tr><td colSpan="5" className="p-8 text-center text-stone-500">No hay comisiones generadas.</td></tr>
                  ) : (
                    comisiones.map(c => (
                      <tr key={c.id} className="hover:bg-stone-50 transition-colors group">
                        <td className="p-5 font-bold text-stone-900">{c.lote_codigo} ({c.tipo_operacion})</td>
                        <td className="p-5">
                          <div className="font-bold text-stone-900">{c.agente_nombre}</div>
                          <div className="text-xs text-stone-500">{c.agente_jerarquia}</div>
                        </td>
                        <td className="p-5 font-medium text-emerald-600">${c.monto}</td>
                        <td className="p-5">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase
                            ${c.estado === 'Pagada' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                            {c.estado}
                          </span>
                        </td>
                        <td className="p-5">
                          {c.estado === 'Pendiente' && (
                            <button onClick={() => handlePagarComision(c.id)} className="px-3 py-1.5 bg-emerald-600 text-white text-xs font-bold rounded-lg hover:bg-emerald-700 transition-colors">
                              Marcar Pagada
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'bancos' && (
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-stone-50 border-b border-stone-200 text-stone-600">
                  <tr>
                    <th className="p-5 font-semibold text-sm">Banco / Nombre</th>
                    <th className="p-5 font-semibold text-sm">Cuenta</th>
                    <th className="p-5 font-semibold text-sm">CLABE</th>
                    <th className="p-5 font-semibold text-sm">Saldo Actual</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {bancos.length === 0 ? (
                    <tr><td colSpan="4" className="p-8 text-center text-stone-500">No hay bancos registrados.</td></tr>
                  ) : (
                    bancos.map(b => (
                      <tr key={b.id} className="hover:bg-stone-50 transition-colors group">
                        <td className="p-5 font-bold text-stone-900">{b.nombre}</td>
                        <td className="p-5 text-stone-600">{b.cuenta || '-'}</td>
                        <td className="p-5 text-stone-600">{b.clabe || '-'}</td>
                        <td className="p-5 font-bold text-emerald-600">${b.saldo}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'transacciones' && (
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-stone-50 border-b border-stone-200 text-stone-600">
                  <tr>
                    <th className="p-5 font-semibold text-sm">Fecha</th>
                    <th className="p-5 font-semibold text-sm">Tipo</th>
                    <th className="p-5 font-semibold text-sm">Concepto</th>
                    <th className="p-5 font-semibold text-sm">Banco</th>
                    <th className="p-5 font-semibold text-sm">Monto ($)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {transacciones.length === 0 ? (
                    <tr><td colSpan="5" className="p-8 text-center text-stone-500">No hay transacciones registradas.</td></tr>
                  ) : (
                    transacciones.map(t => (
                      <tr key={t.id} className="hover:bg-stone-50 transition-colors group">
                        <td className="p-5 text-stone-600">{new Date(t.fecha).toLocaleDateString()}</td>
                        <td className="p-5">
                          <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase
                            ${t.tipo === 'Ingreso' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                            {t.tipo}
                          </span>
                        </td>
                        <td className="p-5 font-medium text-stone-900">{t.concepto}</td>
                        <td className="p-5 text-stone-600">{t.banco_nombre || 'Efectivo / Ninguno'}</td>
                        <td className={`p-5 font-bold ${t.tipo === 'Ingreso' ? 'text-emerald-600' : 'text-red-600'}`}>
                          {t.tipo === 'Ingreso' ? '+' : '-'}${t.monto}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'cobranza' && (
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-stone-50 border-b border-stone-200 text-stone-600">
                  <tr>
                    <th className="p-5 font-semibold text-sm">Operación</th>
                    <th className="p-5 font-semibold text-sm">Cliente</th>
                    <th className="p-5 font-semibold text-sm">Vencimiento</th>
                    <th className="p-5 font-semibold text-sm">Monto a Cobrar ($)</th>
                    <th className="p-5 font-semibold text-sm">Estado</th>
                    <th className="p-5 font-semibold text-sm">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {cobranza.length === 0 ? (
                    <tr><td colSpan="6" className="p-8 text-center text-stone-500">No hay registros de cobranza.</td></tr>
                  ) : (
                    cobranza.map(c => (
                      <tr key={c.id} className="hover:bg-stone-50 transition-colors group">
                        <td className="p-5">
                          <div className="font-bold text-stone-900">{c.lote_codigo}</div>
                          <div className="text-xs text-stone-500">{c.tipo_operacion}</div>
                        </td>
                        <td className="p-5 font-medium text-stone-800">{c.comprador_nombre}</td>
                        <td className="p-5 text-stone-600">{c.fecha_vencimiento ? new Date(c.fecha_vencimiento).toLocaleDateString() : '-'}</td>
                        <td className="p-5 font-bold text-emerald-600">${c.monto_esperado}</td>
                        <td className="p-5">
                          <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase
                            ${c.estado === 'Pagado' ? 'bg-emerald-100 text-emerald-700' : 
                              c.estado === 'Pendiente' ? 'bg-amber-100 text-amber-700' : 
                              'bg-red-100 text-red-700'}`}>
                            {c.estado}
                          </span>
                        </td>
                        <td className="p-5">
                          {c.estado !== 'Pagado' && (
                            <button onClick={() => {
                              setCobranzaAPagar({ id: c.id, banco_id: '' });
                              setShowPagarCobranzaModal(true);
                            }} className="px-3 py-1.5 bg-emerald-600 text-white text-xs font-bold rounded-lg hover:bg-emerald-700 transition-colors">
                              Registrar Pago
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}


          {activeTab === 'empleados' && (
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-stone-50 border-b border-stone-200 text-stone-600">
                  <tr>
                    <th className="p-5 font-semibold text-sm">Empleado / RFC</th>
                    <th className="p-5 font-semibold text-sm">Puesto</th>
                    <th className="p-5 font-semibold text-sm">Ingreso</th>
                    <th className="p-5 font-semibold text-sm">Salario Base</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {empleados.length === 0 ? (
                    <tr><td colSpan="4" className="p-8 text-center text-stone-500">No hay empleados registrados.</td></tr>
                  ) : (
                    empleados.map(e => (
                      <tr key={e.id} className="hover:bg-stone-50 transition-colors group">
                        <td className="p-5">
                          <div className="font-bold text-stone-900">{e.nombre}</div>
                          <div className="text-xs text-stone-500">{e.rfc || 'Sin RFC'}</div>
                        </td>
                        <td className="p-5 text-stone-600">{e.puesto}</td>
                        <td className="p-5 text-stone-600">{new Date(e.fecha_ingreso).toLocaleDateString()}</td>
                        <td className="p-5 font-bold text-emerald-600">${e.salario_base}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'nomina' && (
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-stone-50 border-b border-stone-200 text-stone-600">
                  <tr>
                    <th className="p-5 font-semibold text-sm">Periodo</th>
                    <th className="p-5 font-semibold text-sm">Empleado</th>
                    <th className="p-5 font-semibold text-sm">Fecha Pago</th>
                    <th className="p-5 font-semibold text-sm">Banco / Origen</th>
                    <th className="p-5 font-semibold text-sm">Monto ($)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {nomina.length === 0 ? (
                    <tr><td colSpan="5" className="p-8 text-center text-stone-500">No hay registros de nómina.</td></tr>
                  ) : (
                    nomina.map(n => (
                      <tr key={n.id} className="hover:bg-stone-50 transition-colors group">
                        <td className="p-5 font-bold text-stone-900">{n.periodo}</td>
                        <td className="p-5">
                          <div className="font-bold text-stone-900">{n.empleado_nombre}</div>
                          <div className="text-xs text-stone-500">{n.puesto}</div>
                        </td>
                        <td className="p-5 text-stone-600">{new Date(n.fecha_pago).toLocaleDateString()}</td>
                        <td className="p-5 text-stone-600">{n.banco_nombre || 'Efectivo / Ninguno'}</td>
                        <td className="p-5 font-bold text-emerald-600">${n.monto_pagado}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'configuracion' && (
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-8 max-w-2xl mx-auto mt-10">
              <h2 className="text-2xl font-bold text-stone-900 mb-6">Ajustes Globales</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-2">Nombre de la Empresa</label>
                  <div className="flex gap-4">
                    <input 
                      type="text" 
                      value={configuracion.company_name || ''} 
                      onChange={e => setConfiguracion({...configuracion, company_name: e.target.value})}
                      className="flex-1 px-4 py-3 rounded-xl border border-stone-200 focus:border-[#b91c1c] outline-none"
                    />
                    <button onClick={() => handleGuardarConfiguracion('company_name', configuracion.company_name)} className="px-5 py-3 rounded-xl font-bold bg-[#b91c1c] text-white hover:bg-red-800 transition-colors">Guardar</button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-2">RFC de la Empresa</label>
                  <div className="flex gap-4">
                    <input 
                      type="text" 
                      value={configuracion.company_rfc || ''} 
                      onChange={e => setConfiguracion({...configuracion, company_rfc: e.target.value})}
                      className="flex-1 px-4 py-3 rounded-xl border border-stone-200 focus:border-[#b91c1c] outline-none"
                    />
                    <button onClick={() => handleGuardarConfiguracion('company_rfc', configuracion.company_rfc)} className="px-5 py-3 rounded-xl font-bold bg-[#b91c1c] text-white hover:bg-red-800 transition-colors">Guardar</button>
                  </div>
                </div>
              </div>
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
                <label className="block text-sm font-semibold text-stone-700 mb-2">Fotografía del Proyecto (Opcional)</label>
                <input 
                  type="file" accept="image/*"
                  onChange={e => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => setNuevoProyecto({...nuevoProyecto, logotipo_url: reader.result});
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#b91c1c] focus:ring-2 focus:ring-red-100 outline-none"
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

      {/* MODAL SUBIR PLANO */}
      {showPlanoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl animate-in zoom-in-95">
            <h2 className="text-2xl font-bold text-stone-900 mb-6">Subir Plano SVG</h2>
            <form onSubmit={handleSubirPlano} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">Seleccionar Proyecto</label>
                <select 
                  required
                  value={nuevoPlano.proyecto_id}
                  onChange={e => setNuevoPlano({...nuevoPlano, proyecto_id: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#b91c1c] outline-none"
                >
                  <option value="">-- Elige un proyecto --</option>
                  {proyectos.map(p => (
                    <option key={p.id} value={p.id}>{p.nombre}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">Nombre de Etapa / Manzana</label>
                <input 
                  type="text" required
                  value={nuevoPlano.nombre_etapa} onChange={e => setNuevoPlano({...nuevoPlano, nombre_etapa: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#b91c1c] outline-none"
                  placeholder="Ej: Etapa 1"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">Archivo SVG</label>
                <input 
                  type="file" required accept=".svg"
                  onChange={handleSVGUpload}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-[#b91c1c] hover:file:bg-red-100"
                />
              </div>
              {nuevoPlano.archivo_svg && (
                <div className="text-xs text-green-600 font-bold bg-green-50 p-2 rounded">
                  ✅ Archivo SVG cargado en memoria ({Math.round(nuevoPlano.archivo_svg.length / 1024)} kb)
                </div>
              )}
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setShowPlanoModal(false)} className="px-5 py-2.5 rounded-xl font-semibold text-stone-500 hover:bg-stone-100">Cancelar</button>
                <button type="submit" disabled={isUploading || !nuevoPlano.archivo_svg} className="px-5 py-2.5 rounded-xl font-bold bg-[#b91c1c] text-white hover:bg-red-800 disabled:opacity-50">
                  {isUploading ? 'Guardando...' : 'Guardar Plano'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL NUEVO LOTE */}
      {showLoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl animate-in zoom-in-95">
            <h2 className="text-2xl font-bold text-stone-900 mb-6">Alta de Terreno / Lote</h2>
            <form onSubmit={handleCrearLote} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">Plano Asociado (Opcional)</label>
                <select 
                  value={nuevoLote.plano_id}
                  onChange={e => setNuevoLote({...nuevoLote, plano_id: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#b91c1c] outline-none"
                >
                  <option value="">-- Sin plano específico --</option>
                  {planos.map(p => (
                    <option key={p.id} value={p.id}>{p.nombre_etapa}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">Código en el SVG (ID)</label>
                <input 
                  type="text" required
                  value={nuevoLote.codigo} onChange={e => setNuevoLote({...nuevoLote, codigo: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#b91c1c] outline-none"
                  placeholder="Ej: L01, MZA1-05"
                />
                <p className="text-xs text-stone-500 mt-1">Este código debe coincidir exactamente con el ID dentro del archivo SVG para que sea clickeable.</p>
              </div>
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block text-sm font-semibold text-stone-700 mb-2">Superficie (m²)</label>
                  <input 
                    type="number" step="0.01" required
                    value={nuevoLote.superficie_m2} onChange={e => setNuevoLote({...nuevoLote, superficie_m2: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#b91c1c] outline-none"
                    placeholder="Ej: 150.50"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-semibold text-stone-700 mb-2">Precio por m² ($)</label>
                  <input 
                    type="number" step="0.01" required
                    value={nuevoLote.precio_m2} onChange={e => setNuevoLote({...nuevoLote, precio_m2: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#b91c1c] outline-none"
                    placeholder="Ej: 3200"
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setShowLoteModal(false)} className="px-5 py-2.5 rounded-xl font-semibold text-stone-500 hover:bg-stone-100">Cancelar</button>
                <button type="submit" className="px-5 py-2.5 rounded-xl font-bold bg-[#b91c1c] text-white hover:bg-red-800 shadow-lg shadow-red-900/20">
                  Crear Lote
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* MODAL NUEVO COMPRADOR */}
      {showCompradorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl animate-in zoom-in-95">
            <h2 className="text-2xl font-bold text-stone-900 mb-6">Nuevo Comprador</h2>
            <form onSubmit={handleCrearComprador} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">Nombre Completo</label>
                <input 
                  type="text" required
                  value={nuevoComprador.nombre} onChange={e => setNuevoComprador({...nuevoComprador, nombre: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#b91c1c] outline-none"
                />
              </div>
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block text-sm font-semibold text-stone-700 mb-2">Teléfono</label>
                  <input 
                    type="text"
                    value={nuevoComprador.telefono} onChange={e => setNuevoComprador({...nuevoComprador, telefono: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#b91c1c] outline-none"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-semibold text-stone-700 mb-2">Email</label>
                  <input 
                    type="email"
                    value={nuevoComprador.email} onChange={e => setNuevoComprador({...nuevoComprador, email: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#b91c1c] outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">RFC</label>
                <input 
                  type="text"
                  value={nuevoComprador.rfc} onChange={e => setNuevoComprador({...nuevoComprador, rfc: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#b91c1c] outline-none"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setShowCompradorModal(false)} className="px-5 py-2.5 rounded-xl font-semibold text-stone-500 hover:bg-stone-100">Cancelar</button>
                <button type="submit" className="px-5 py-2.5 rounded-xl font-bold bg-[#b91c1c] text-white hover:bg-red-800 shadow-lg shadow-red-900/20">Crear</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL NUEVO PROPIETARIO */}
      {showPropietarioModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl animate-in zoom-in-95">
            <h2 className="text-2xl font-bold text-stone-900 mb-6">Nuevo Propietario</h2>
            <form onSubmit={handleCrearPropietario} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">Nombre Completo</label>
                <input 
                  type="text" required
                  value={nuevoPropietario.nombre} onChange={e => setNuevoPropietario({...nuevoPropietario, nombre: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#b91c1c] outline-none"
                />
              </div>
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block text-sm font-semibold text-stone-700 mb-2">Teléfono</label>
                  <input 
                    type="text"
                    value={nuevoPropietario.telefono} onChange={e => setNuevoPropietario({...nuevoPropietario, telefono: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#b91c1c] outline-none"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-semibold text-stone-700 mb-2">Email</label>
                  <input 
                    type="email"
                    value={nuevoPropietario.email} onChange={e => setNuevoPropietario({...nuevoPropietario, email: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#b91c1c] outline-none"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setShowPropietarioModal(false)} className="px-5 py-2.5 rounded-xl font-semibold text-stone-500 hover:bg-stone-100">Cancelar</button>
                <button type="submit" className="px-5 py-2.5 rounded-xl font-bold bg-[#b91c1c] text-white hover:bg-red-800 shadow-lg shadow-red-900/20">Crear</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL NUEVA OPERACION */}
      {showOperacionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl animate-in zoom-in-95">
            <h2 className="text-2xl font-bold text-stone-900 mb-6">Registrar Operación</h2>
            <form onSubmit={handleCrearOperacion} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">Inmueble / Lote</label>
                <select 
                  required
                  value={nuevaOperacion.lote_id}
                  onChange={e => setNuevaOperacion({...nuevaOperacion, lote_id: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#b91c1c] outline-none"
                >
                  <option value="">-- Seleccionar --</option>
                  {lotes.filter(l => l.estado === 'Disponible').map(l => (
                    <option key={l.id} value={l.id}>{l.codigo} - ${l.precio_m2}/m2</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">Comprador</label>
                <select 
                  required
                  value={nuevaOperacion.comprador_id}
                  onChange={e => setNuevaOperacion({...nuevaOperacion, comprador_id: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#b91c1c] outline-none"
                >
                  <option value="">-- Seleccionar --</option>
                  {compradores.map(c => (
                    <option key={c.id} value={c.id}>{c.nombre}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">Agente (Opcional)</label>
                <select 
                  value={nuevaOperacion.agente_id}
                  onChange={e => setNuevaOperacion({...nuevaOperacion, agente_id: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#b91c1c] outline-none"
                >
                  <option value="">-- Sin Agente --</option>
                  {agentes.map(a => (
                    <option key={a.id} value={a.id}>{a.nombre} ({a.porcentaje_comision}%)</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block text-sm font-semibold text-stone-700 mb-2">Tipo de Operación</label>
                  <select 
                    required
                    value={nuevaOperacion.tipo_operacion}
                    onChange={e => setNuevaOperacion({...nuevaOperacion, tipo_operacion: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#b91c1c] outline-none"
                  >
                    <option value="Venta">Venta</option>
                    <option value="Renta">Renta</option>
                    <option value="Reservacion">Reservación</option>
                  </select>
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-semibold text-stone-700 mb-2">Monto ($)</label>
                  <input 
                    type="number" step="0.01" required
                    value={nuevaOperacion.monto} onChange={e => setNuevaOperacion({...nuevaOperacion, monto: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#b91c1c] outline-none"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setShowOperacionModal(false)} className="px-5 py-2.5 rounded-xl font-semibold text-stone-500 hover:bg-stone-100">Cancelar</button>
                <button type="submit" className="px-5 py-2.5 rounded-xl font-bold bg-[#b91c1c] text-white hover:bg-red-800 shadow-lg shadow-red-900/20">Registrar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL NUEVO AGENTE */}
      {showAgenteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl animate-in zoom-in-95">
            <h2 className="text-2xl font-bold text-stone-900 mb-6">Nuevo Agente</h2>
            <form onSubmit={handleCrearAgente} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">Nombre Completo</label>
                <input 
                  type="text" required
                  value={nuevoAgente.nombre} onChange={e => setNuevoAgente({...nuevoAgente, nombre: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#b91c1c] outline-none"
                />
              </div>
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block text-sm font-semibold text-stone-700 mb-2">Teléfono</label>
                  <input 
                    type="text"
                    value={nuevoAgente.telefono} onChange={e => setNuevoAgente({...nuevoAgente, telefono: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#b91c1c] outline-none"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-semibold text-stone-700 mb-2">Email</label>
                  <input 
                    type="email"
                    value={nuevoAgente.email} onChange={e => setNuevoAgente({...nuevoAgente, email: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#b91c1c] outline-none"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block text-sm font-semibold text-stone-700 mb-2">Jerarquía</label>
                  <select 
                    value={nuevoAgente.jerarquia}
                    onChange={e => setNuevoAgente({...nuevoAgente, jerarquia: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#b91c1c] outline-none"
                  >
                    <option value="Gerente">Gerente</option>
                    <option value="Coordinador">Coordinador</option>
                    <option value="Promotor">Promotor</option>
                    <option value="Influencer">Influencer</option>
                  </select>
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-semibold text-stone-700 mb-2">% Comisión Directa</label>
                  <input 
                    type="number" step="0.1" required
                    value={nuevoAgente.porcentaje_comision} onChange={e => setNuevoAgente({...nuevoAgente, porcentaje_comision: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#b91c1c] outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">Jefe Directo (Opcional)</label>
                <select 
                  value={nuevoAgente.jefe_id}
                  onChange={e => setNuevoAgente({...nuevoAgente, jefe_id: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#b91c1c] outline-none"
                >
                  <option value="">-- Ninguno --</option>
                  {agentes.map(a => (
                    <option key={a.id} value={a.id}>{a.nombre} ({a.jerarquia})</option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setShowAgenteModal(false)} className="px-5 py-2.5 rounded-xl font-semibold text-stone-500 hover:bg-stone-100">Cancelar</button>
                <button type="submit" className="px-5 py-2.5 rounded-xl font-bold bg-[#b91c1c] text-white hover:bg-red-800 shadow-lg shadow-red-900/20">Crear Agente</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL NUEVO INVERSIONISTA */}
      {showInversionistaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl animate-in zoom-in-95">
            <h2 className="text-2xl font-bold text-stone-900 mb-6">Nuevo Inversionista</h2>
            <form onSubmit={handleCrearInversionista} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">Nombre Completo</label>
                <input 
                  type="text" required
                  value={nuevoInversionista.nombre} onChange={e => setNuevoInversionista({...nuevoInversionista, nombre: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#b91c1c] outline-none"
                />
              </div>
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block text-sm font-semibold text-stone-700 mb-2">Teléfono</label>
                  <input 
                    type="text"
                    value={nuevoInversionista.telefono} onChange={e => setNuevoInversionista({...nuevoInversionista, telefono: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#b91c1c] outline-none"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-semibold text-stone-700 mb-2">Email</label>
                  <input 
                    type="email"
                    value={nuevoInversionista.email} onChange={e => setNuevoInversionista({...nuevoInversionista, email: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#b91c1c] outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">Total Invertido Inicial ($)</label>
                <input 
                  type="number" step="0.01" required
                  value={nuevoInversionista.total_invertido} onChange={e => setNuevoInversionista({...nuevoInversionista, total_invertido: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#b91c1c] outline-none"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setShowInversionistaModal(false)} className="px-5 py-2.5 rounded-xl font-semibold text-stone-500 hover:bg-stone-100">Cancelar</button>
                <button type="submit" className="px-5 py-2.5 rounded-xl font-bold bg-[#b91c1c] text-white hover:bg-red-800 shadow-lg shadow-red-900/20">Crear Inversionista</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL NUEVO BANCO */}
      {showBancoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl animate-in zoom-in-95">
            <h2 className="text-2xl font-bold text-stone-900 mb-6">Registrar Cuenta Bancaria</h2>
            <form onSubmit={handleCrearBanco} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">Alias / Nombre (Ej: Bancomer Empresa)</label>
                <input 
                  type="text" required
                  value={nuevoBanco.nombre} onChange={e => setNuevoBanco({...nuevoBanco, nombre: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#b91c1c] outline-none"
                />
              </div>
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block text-sm font-semibold text-stone-700 mb-2">No. de Cuenta</label>
                  <input 
                    type="text"
                    value={nuevoBanco.cuenta} onChange={e => setNuevoBanco({...nuevoBanco, cuenta: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#b91c1c] outline-none"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-semibold text-stone-700 mb-2">CLABE Interbancaria</label>
                  <input 
                    type="text"
                    value={nuevoBanco.clabe} onChange={e => setNuevoBanco({...nuevoBanco, clabe: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#b91c1c] outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">Saldo Inicial ($)</label>
                <input 
                  type="number" step="0.01"
                  value={nuevoBanco.saldo} onChange={e => setNuevoBanco({...nuevoBanco, saldo: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#b91c1c] outline-none"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setShowBancoModal(false)} className="px-5 py-2.5 rounded-xl font-semibold text-stone-500 hover:bg-stone-100">Cancelar</button>
                <button type="submit" className="px-5 py-2.5 rounded-xl font-bold bg-[#b91c1c] text-white hover:bg-red-800 shadow-lg shadow-red-900/20">Guardar Banco</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL NUEVA TRANSACCION */}
      {showTransaccionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl animate-in zoom-in-95">
            <h2 className="text-2xl font-bold text-stone-900 mb-6">Registrar Transacción</h2>
            <form onSubmit={handleCrearTransaccion} className="space-y-4">
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block text-sm font-semibold text-stone-700 mb-2">Tipo</label>
                  <select 
                    required
                    value={nuevaTransaccion.tipo}
                    onChange={e => setNuevaTransaccion({...nuevaTransaccion, tipo: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#b91c1c] outline-none"
                  >
                    <option value="Ingreso">Ingreso</option>
                    <option value="Egreso">Egreso</option>
                  </select>
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-semibold text-stone-700 mb-2">Monto ($)</label>
                  <input 
                    type="number" step="0.01" required
                    value={nuevaTransaccion.monto} onChange={e => setNuevaTransaccion({...nuevaTransaccion, monto: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#b91c1c] outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">Concepto</label>
                <input 
                  type="text" required placeholder="Ej. Pago de luz, Anticipo cliente..."
                  value={nuevaTransaccion.concepto} onChange={e => setNuevaTransaccion({...nuevaTransaccion, concepto: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#b91c1c] outline-none"
                />
              </div>
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block text-sm font-semibold text-stone-700 mb-2">Banco Afectado</label>
                  <select 
                    value={nuevaTransaccion.banco_id}
                    onChange={e => setNuevaTransaccion({...nuevaTransaccion, banco_id: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#b91c1c] outline-none"
                  >
                    <option value="">-- Efectivo / Ninguno --</option>
                    {bancos.map(b => (
                      <option key={b.id} value={b.id}>{b.nombre} (Saldo: ${b.saldo})</option>
                    ))}
                  </select>
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-semibold text-stone-700 mb-2">Fecha</label>
                  <input 
                    type="date"
                    value={nuevaTransaccion.fecha} onChange={e => setNuevaTransaccion({...nuevaTransaccion, fecha: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#b91c1c] outline-none"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setShowTransaccionModal(false)} className="px-5 py-2.5 rounded-xl font-semibold text-stone-500 hover:bg-stone-100">Cancelar</button>
                <button type="submit" className="px-5 py-2.5 rounded-xl font-bold bg-[#b91c1c] text-white hover:bg-red-800 shadow-lg shadow-red-900/20">Registrar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL NUEVA COBRANZA (Manual) */}
      {showCobranzaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl animate-in zoom-in-95">
            <h2 className="text-2xl font-bold text-stone-900 mb-6">Registrar Cobranza Esperada</h2>
            <form onSubmit={handleCrearCobranza} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">Operación (Venta asociada)</label>
                <select 
                  required
                  value={nuevaCobranza.operacion_id}
                  onChange={e => setNuevaCobranza({...nuevaCobranza, operacion_id: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#b91c1c] outline-none"
                >
                  <option value="">-- Seleccionar Venta --</option>
                  {operaciones.map(o => (
                    <option key={o.id} value={o.id}>{o.lote_codigo} - {o.comprador_nombre} (${o.monto})</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block text-sm font-semibold text-stone-700 mb-2">Monto a Cobrar ($)</label>
                  <input 
                    type="number" step="0.01" required
                    value={nuevaCobranza.monto_esperado} onChange={e => setNuevaCobranza({...nuevaCobranza, monto_esperado: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#b91c1c] outline-none"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-semibold text-stone-700 mb-2">Vencimiento</label>
                  <input 
                    type="date" required
                    value={nuevaCobranza.fecha_vencimiento} onChange={e => setNuevaCobranza({...nuevaCobranza, fecha_vencimiento: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#b91c1c] outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">Notas (Opcional)</label>
                <input 
                  type="text" placeholder="Ej. Pagaré 1 de 12"
                  value={nuevaCobranza.notas} onChange={e => setNuevaCobranza({...nuevaCobranza, notas: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#b91c1c] outline-none"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setShowCobranzaModal(false)} className="px-5 py-2.5 rounded-xl font-semibold text-stone-500 hover:bg-stone-100">Cancelar</button>
                <button type="submit" className="px-5 py-2.5 rounded-xl font-bold bg-[#b91c1c] text-white hover:bg-red-800 shadow-lg shadow-red-900/20">Programar Cobro</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL PAGAR COBRANZA */}
      {showPagarCobranzaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 w-full max-w-sm shadow-2xl animate-in zoom-in-95">
            <h2 className="text-xl font-bold text-stone-900 mb-4">Confirmar Recepción de Pago</h2>
            <p className="text-sm text-stone-500 mb-6">Selecciona en qué banco ingresó el dinero. Si fue en efectivo, déjalo vacío.</p>
            <form onSubmit={handlePagarCobranza} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">Banco de Ingreso</label>
                <select 
                  value={cobranzaAPagar.banco_id}
                  onChange={e => setCobranzaAPagar({...cobranzaAPagar, banco_id: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#b91c1c] outline-none"
                >
                  <option value="">-- Efectivo / Ninguno --</option>
                  {bancos.map(b => (
                    <option key={b.id} value={b.id}>{b.nombre}</option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setShowPagarCobranzaModal(false)} className="px-5 py-2.5 rounded-xl font-semibold text-stone-500 hover:bg-stone-100">Cancelar</button>
                <button type="submit" className="px-5 py-2.5 rounded-xl font-bold bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-900/20">Confirmar Pago</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL NUEVO EMPLEADO */}
      {showEmpleadoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl animate-in zoom-in-95">
            <h2 className="text-2xl font-bold text-stone-900 mb-6">Registrar Empleado (Sueldo Base)</h2>
            <form onSubmit={handleCrearEmpleado} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">Nombre Completo</label>
                <input 
                  type="text" required
                  value={nuevoEmpleado.nombre} onChange={e => setNuevoEmpleado({...nuevoEmpleado, nombre: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#b91c1c] outline-none"
                />
              </div>
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block text-sm font-semibold text-stone-700 mb-2">RFC</label>
                  <input 
                    type="text"
                    value={nuevoEmpleado.rfc} onChange={e => setNuevoEmpleado({...nuevoEmpleado, rfc: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#b91c1c] outline-none"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-semibold text-stone-700 mb-2">Puesto</label>
                  <input 
                    type="text" required
                    value={nuevoEmpleado.puesto} onChange={e => setNuevoEmpleado({...nuevoEmpleado, puesto: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#b91c1c] outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">Salario Base Mensual ($)</label>
                <input 
                  type="number" step="0.01" required
                  value={nuevoEmpleado.salario_base} onChange={e => setNuevoEmpleado({...nuevoEmpleado, salario_base: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#b91c1c] outline-none"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setShowEmpleadoModal(false)} className="px-5 py-2.5 rounded-xl font-semibold text-stone-500 hover:bg-stone-100">Cancelar</button>
                <button type="submit" className="px-5 py-2.5 rounded-xl font-bold bg-[#b91c1c] text-white hover:bg-red-800 shadow-lg shadow-red-900/20">Guardar Empleado</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL PAGAR NÓMINA */}
      {showNominaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl animate-in zoom-in-95">
            <h2 className="text-2xl font-bold text-stone-900 mb-6">Generar Pago de Nómina</h2>
            <form onSubmit={handleCrearNomina} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">Empleado</label>
                <select 
                  required
                  value={nuevaNomina.empleado_id}
                  onChange={e => {
                    const emp = empleados.find(x => x.id == e.target.value);
                    setNuevaNomina({
                      ...nuevaNomina, 
                      empleado_id: e.target.value,
                      monto_pagado: emp ? emp.salario_base : ''
                    });
                  }}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#b91c1c] outline-none"
                >
                  <option value="">-- Seleccionar Empleado --</option>
                  {empleados.map(emp => (
                    <option key={emp.id} value={emp.id}>{emp.nombre} - {emp.puesto}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block text-sm font-semibold text-stone-700 mb-2">Periodo (Ej. Quincena 15)</label>
                  <input 
                    type="text" required
                    value={nuevaNomina.periodo} onChange={e => setNuevaNomina({...nuevaNomina, periodo: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#b91c1c] outline-none"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-semibold text-stone-700 mb-2">Monto a Pagar ($)</label>
                  <input 
                    type="number" step="0.01" required
                    value={nuevaNomina.monto_pagado} onChange={e => setNuevaNomina({...nuevaNomina, monto_pagado: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#b91c1c] outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">Banco de Origen (De donde sale el dinero)</label>
                <select 
                  value={nuevaNomina.banco_id}
                  onChange={e => setNuevaNomina({...nuevaNomina, banco_id: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#b91c1c] outline-none"
                >
                  <option value="">-- Efectivo / Caja Fuerte --</option>
                  {bancos.map(b => (
                    <option key={b.id} value={b.id}>{b.nombre} (Saldo actual: ${b.saldo})</option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setShowNominaModal(false)} className="px-5 py-2.5 rounded-xl font-semibold text-stone-500 hover:bg-stone-100">Cancelar</button>
                <button type="submit" className="px-5 py-2.5 rounded-xl font-bold bg-[#b91c1c] text-white hover:bg-red-800 shadow-lg shadow-red-900/20">Ejecutar Pago</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
