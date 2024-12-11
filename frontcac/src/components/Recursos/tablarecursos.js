import React, { useState, useEffect } from 'react';
import '../../App.css';
import IrCrearRecurso from './botoncrearrecurso';
import IrActRecurso from './botonactualizarrecurso';

export const TablaRecursos = () => {
  const [recursos, setRecursos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8081/recursos/recurso/listar')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error en la respuesta de la API');
        }
        return response.json();
      })
      .then((result) => {
        console.log("Datos recibidos desde API:", result); // Muestra el resultado completo
        setRecursos(result.data || result); // Usa `result` si `result.data` no existe
      })
      .catch((error) => console.error('Error al cargar recursos:', error));
  }, []);

  useEffect(() => {
    console.log("Estado `recursos` actualizado:", recursos);
  }, [recursos]);

  return (
    <div class="usuario">
      <p class="Titulo-texto">Listar recursos</p>
      <br />
      <IrCrearRecurso />
      <br />
      <IrActRecurso />
      <br />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre de Recurso</th>
            <th>Cantidad de recursos</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {recursos?.length > 0 ? (
            recursos.map((recurso) => (
              <tr key={recurso.id}>
                <td>{recurso.id}</td>
                <td>{recurso.nombre}</td>
                <td>{recurso.cantidad}</td>
                <td>{recurso.estadoRegistro ? 'Activo' : 'Inactivo'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No hay recursos disponibles</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
