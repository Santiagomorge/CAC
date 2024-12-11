import React, { useState, useEffect } from "react";
import '../actualizarusuario/actualizarusuario.css';
import { useNavigate } from "react-router-dom";

export const CrearRecurso = () => {
  const [formData, setFormData] = useState({
    fechaCreacion: '', // Se inicializará con la fecha actual en el `useEffect`
    estadoRegistro: '',
    nombre: '',
    cantidad: 1 // Default cantidad a 1
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Establece la fecha de creación automáticamente al cargar el componente
  useEffect(() => {
    const currentDate = new Date().toISOString(); // Fecha en formato ISO
    setFormData((prevFormData) => ({
      ...prevFormData,
      fechaCreacion: currentDate
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "estadoRegistro" ? (value === "ACTIVO") : value, // Convertir a booleano: "ACTIVO" => true, "INACTIVO" => false
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.estadoRegistro) {
      newErrors.estadoRegistro = "El estado es obligatorio.";
    }
    if (!formData.nombre) {
      newErrors.nombre = "El nombre es obligatorio.";
    }
    if (formData.cantidad <= 0) {
      newErrors.cantidad = "La cantidad debe ser mayor a 0.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const dataToSend = {
      ...formData,
      fechaActualizacion: null, // Se envía como null porque no ha sido actualizado
    };

    fetch('http://localhost:8081/recursos/recurso/crear', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
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
        <label>Fecha creación (automática):
          <input
            type="datetime-local"
            name="fechaCreacion"
            value={formData.fechaCreacion}
            readOnly
          />
        </label>
        <label>Estado:
          <select
            name="estadoRegistro"
            value={formData.estadoRegistro ? "ACTIVO" : "INACTIVO"}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione</option>
            <option value="ACTIVO">ACTIVO</option>
            <option value="INACTIVO">INACTIVO</option>
          </select>
          {errors.estadoRegistro && <p className="error-message">{errors.estadoRegistro}</p>}
        </label>
        <label>Nombre:
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
          {errors.nombre && <p className="error-message">{errors.nombre}</p>}
        </label>
        <label>Cantidad:
          <input
            type="number"
            name="cantidad"
            value={formData.cantidad}
            onChange={handleChange}
            min="1"
          />
          {errors.cantidad && <p className="error-message">{errors.cantidad}</p>}
        </label>
        <button type="submit">Crear Recurso</button>
      </form>
    </div>
  );
};