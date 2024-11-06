import React, { useState } from "react";
import '../actualizarusuario/actualizarusuario.css';
import { useNavigate } from "react-router-dom";

export const CrearRecurso = () => {
  const [formData, setFormData] = useState({
    fechaCreacion: '',
    fechaActualizacion: '',
    estadoRegistro: '',
    nombre: '',
    cantidad: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Convertir "ACTIVO" e "INACTIVO" a valores booleanos para estadoRegistro
    setFormData({
      ...formData,
      [name]: name === "estadoRegistro" ? (value === "ACTIVO") : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:8081/recursos/recurso/crear', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al crear recurso');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Recurso creado:', data);
        navigate('/recursos');
      })
      .catch((error) => console.error('Error:', error));
  };

  return (
    <div>
      <p className="Titulo-texto">Crear recurso</p>
      <form onSubmit={handleSubmit}>
        <label>Fecha creación:
          <input type="datetime-local" name="fechaCreacion" value={formData.fechaCreacion} onChange={handleChange} required />
        </label>
        <label>Fecha actualización:
          <input type="datetime-local" name="fechaActualizacion" value={formData.fechaActualizacion} onChange={handleChange} required />
        </label>
        <label>Estado:
          <select name="estadoRegistro" value={formData.estadoRegistro ? "ACTIVO" : "INACTIVO"} onChange={handleChange} required>
            <option value="">Seleccione</option>
            <option value="ACTIVO">ACTIVO</option>
            <option value="INACTIVO">INACTIVO</option>
          </select>
        </label>
        <label>Nombre:
          <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
        </label>
        <label>Cantidad:
          <input type="number" name="cantidad" value={formData.cantidad} onChange={handleChange} required />
        </label>
        <button type="submit">Crear Recurso</button>
      </form>
    </div>
  );
};
