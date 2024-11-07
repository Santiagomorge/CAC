import React from 'react';
import '../../App.css';
import { useNavigate } from 'react-router-dom';

export const Index = () => {
    
    const navigate = useNavigate();

    const irUsuarios = () => {
        navigate('/');
    };

    const irRecursos = () => {
        navigate('/recursos');
    };

    return <div class="index">
        <div class="index-container">
            
        </div>
          <button class="card" onClick={irUsuarios}>Usuarios</button>
          <button class="card" onClick={irRecursos}>Recursos</button>
          <button class="card">Visitantes</button>
          <button class="card">Empleados</button>
          <button class="card">Compañías</button>
          <button class="card">Sucursales</button>
          <button class="card">Dependencias</button>
          <button class="card">Reportes</button>
        </div>
       
}   