import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CrearUsuario } from './components/crearusuario/crearusuario';
import { Header } from './components/header/header';
import { Usuarios } from './components/usuarios/usuarios';
import { Index } from './components/index';

function App() {
  return (
    <div className="app-container">
      <Header />
      <Index />
      <Router>
        <Routes>
          <Route exact path="/listarusuarios" element={<Usuarios/>}/>
          <Route exact path="/crearusuarios" element={<CrearUsuario/>} />
        </Routes>
      </Router>
        
    </div>
  );
}

export default App;
