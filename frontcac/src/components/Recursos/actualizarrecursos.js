import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ActualizarRecurso = () => {
  const [formData, setFormData] = useState({
    id: '',
    fechaCreacion: '',
    fechaActualizacion: '',
    estadoRegistro: '',
    nombre: '',
    cantidad: ''
  });

  const navigate = useNavigate();

  // Obtener los datos del recurso al ingresar el ID
  useEffect(() => {
    // Solo realizar la solicitud si el ID está disponible
    if (formData.id) {
      fetch(`http://localhost:8081/recursos/recurso/${formData.id}`)
        .then(response => response.json())
        .then(data => {
          setFormData({
            ...data,
            fechaActualizacion: new Date().toISOString() // Asignar fecha de actualización actual
          });
        })
        .catch(error => console.error('Error al obtener recurso:', error));
    }
  }, [formData.id]); // Reaccionar al cambio de ID

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { id, fechaCreacion, ...dataToSend } = formData;

    // Solo se envían los campos que han cambiado
    const updatedData = { ...dataToSend };

    // Si un campo no ha cambiado, no se debe enviar al backend
    if (!updatedData.estadoRegistro) {
      updatedData.estadoRegistro = formData.estadoRegistro;
    }
    if (!updatedData.nombre) {
      updatedData.nombre = formData.nombre;
    }
    if (!updatedData.cantidad) {
      updatedData.cantidad = formData.cantidad;
    }

    fetch(`http://localhost:8081/recursos/recurso/actualizar/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al actualizar recurso');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Recurso actualizado:', data);
        navigate('/recursos');  // Redirige a la lista de recursos
      })
      .catch((error) => console.error('Error:', error));
  };

  return (
    <div>
      <p className="Titulo-texto">Actualizar recurso</p>
      
      <form onSubmit={handleSubmit}>
        <label>ID:
          <input
            type="number"
            name="id"
            value={formData.id}
            onChange={handleChange}
            required
          />
        </label>
        
        {formData.id && (
          <>
            <label>Fecha creación:
              <input
                type="text"
                name="fechaCreacion"
                value={formData.fechaCreacion}
                readOnly
              />
            </label>
            
            <label>Fecha actualización:
              <input
                type="datetime-local"
                name="fechaActualizacion"
                value={formData.fechaActualizacion || new Date().toISOString().slice(0, 16)}
                onChange={handleChange}
              />
            </label>
            
            <label>Estado:
              <select name="estadoRegistro" value={formData.estadoRegistro} onChange={handleChange}>
                <option value="">Seleccione</option>
                <option value="true">ACTIVO</option>
                <option value="false">INACTIVO</option>
              </select>
            </label>
            
            <label>Nombre:
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
              />
            </label>
            
            <label>Cantidad:
              <input
                type="number"
                name="cantidad"
                value={formData.cantidad}
                onChange={handleChange}
              />
            </label>
            
            <button type="submit">Actualizar Recurso</button>
          </>
        )}
      </form>
    </div>
  );
};
