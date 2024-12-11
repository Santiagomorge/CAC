import './App.css'; 
import React, { useState, useEffect } from 'react'; 
import { Route, Routes, useLocation, Navigate } from 'react-router-dom'; 
import { CrearUsuario } from './components/crearusuario/crearusuario'; 
import { ActualizarUsuario } from './components/actualizarusuario/actualizarusuario'; 
import { Header } from './components/header/header'; 
import { Usuarios } from './components/usuarios/usuarios'; 
import { Index } from './components/index'; 
import { CrearRecurso } from './components/Recursos/crearrecurso'; 
import { ActualizarRecurso } from './components/Recursos/actualizarrecursos'; 
import { TablaRecursos } from './components/Recursos/tablarecursos'; 
import { SignIn } from './components/Login/signin';
import { SignInRecursos } from './components/Login/loginRecursos/SignInRecursos';
import { NuevaVistaRecursos } from './components/Login/loginRecursos/NuevaVistaRecursos';

function App() {
  const location = useLocation();
  const [hideHeaderAndIndex, setHideHeaderAndIndex] = useState(false);

  // Actualiza el estado según la ruta actual
  useEffect(() => {
    if (location.pathname === '/' || location.pathname === '/Login' || location.pathname === '/login-recursos' || location.pathname === '/vista-recursos'  ) {
      setHideHeaderAndIndex(true);
    } else {
      setHideHeaderAndIndex(false);
    }
  }, [location.pathname]); // Se ejecuta cada vez que la ruta cambia

  return (
    <div className="app-container">
      {/* Solo renderiza Header si no estamos en la página de Login */}
      {!hideHeaderAndIndex && <Header />}

      <Routes>
        <Route exact path="/" element={<SignIn />} />
        <Route exact path="/crearusuarios" element={<CrearUsuario />} />
        <Route exact path="/Actusuarios" element={<ActualizarUsuario />} />
        <Route exact path="/recursos" element={<TablaRecursos />} />
        <Route exact path="/crearrecursos" element={<CrearRecurso />} />
        <Route exact path="/Actrecursos" element={<ActualizarRecurso />} />
        <Route exact path="/Login" element={<SignIn />} />
        <Route exact path="/Usuarios" element={<Usuarios />} />
        <Route exact path="/login-recursos" element={<SignInRecursos />} />
        <Route exact path="/vista-recursos" element={<NuevaVistaRecursos />} />
        
        {/* Ruta de captura para cualquier otra URL, redirige a Login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Solo renderiza Index si no estamos en la página de Login */}
      {!hideHeaderAndIndex && <Index />}
    </div>
  );
}

export default App;
