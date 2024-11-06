import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CrearUsuario } from './components/crearusuario/crearusuario';
import { ActualizarUsuario } from './components/actualizarusuario/actualizarusuario';
import { Header } from './components/header/header';
import { Usuarios } from './components/usuarios/usuarios';
import { Index } from './components/index';
import { TablaRecursos } from './components/Recursos/tablarecursos';
import { CrearRecurso } from './components/Recursos/crearrecurso';
import { ActualizarRecurso } from './components/Recursos/actualizarrecursos';

function App() {
  return (
    <div className="app-container">
      <Header />
      <Index />
      <Router>
        <Routes>
          <Route exact path="/" element={<Usuarios/>}/>
          <Route exact path="/crearusuarios" element={<CrearUsuario/>} />
          <Route exact path="/Actusuarios" element={<ActualizarUsuario />} />
          <Route exact path="/recursos" element={<TablaRecursos/>} />
          <Route exact path="/crearrecursos" element={<CrearRecurso/>} />
          <Route exact path="/Actrecursos" element={<ActualizarRecurso/>} />
        </Routes>
      </Router>
        
    </div>
  );
}

export default App;
