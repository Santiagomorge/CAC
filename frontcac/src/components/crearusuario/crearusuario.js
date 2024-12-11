import React, { useState } from "react";
import './crearusuario.css';
import { useNavigate } from 'react-router-dom';

export const CrearUsuario = () => {
  const irUsuarios = () => {
    navigate('/usuarios');
};
  const [formData, setFormData] = useState({
    id: 1, // ID inicial
    employee_id: 1, // Asignado por defecto
    estadoEnum: '',
    password: '',
    username: '',
    rol: '' // Cambiará a número
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Maneja los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setErrors({
      ...errors,
      [name]: '' // Limpiar errores al modificar un campo
    });
  };

  // Valida los datos antes de enviar
  const validate = () => {
    const newErrors = {};

    if (!formData.estadoEnum) {
      newErrors.estadoEnum = "El estado es obligatorio.";
    }
    if (!formData.password) {
      newErrors.password = "La contraseña es obligatoria.";
    } else if (!/^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(formData.password)) {
      newErrors.password = "La contraseña debe tener al menos 8 caracteres, una mayúscula y un signo especial.";
    }
    if (!formData.username) {
      newErrors.username = "El nombre de usuario es obligatorio.";
    }
    if (!formData.rol) {
      newErrors.rol = "El rol es obligatorio.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Envía los datos al backend
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    fetch('http://localhost:8080/usuario/api/v1/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al crear usuario');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Usuario creado:', data);

        // Incrementa automáticamente el ID para el próximo usuario
        setFormData((prevState) => ({
          ...prevState,
          id: prevState.id + 1,
          password: '',
          username: '',
          estadoEnum: '',
          rol: ''
        }));

        navigate('/usuarios');
      })
      .catch((error) => console.error('Error:', error));
  };

  return (
    <div>
      <p className="Titulo-texto">Crear usuario</p>

      <form onSubmit={handleSubmit}>
        <label>ID:
          <input
            type="text"
            name="id"
            value={formData.id}
            readOnly // Campo solo lectura
          />
        </label>

        <label>Estado:
          <select
            name="estadoEnum"
            value={formData.estadoEnum}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione</option>
            <option value="ACTIVO">ACTIVO</option>
            <option value="INACTIVO">INACTIVO</option>
          </select>
          {errors.estadoEnum && <p className="error-message">{errors.estadoEnum}</p>}
        </label>

        <label>Contraseña:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <p className="error-message">{errors.password}</p>}
        </label>

        <label>Nombre de Usuario:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          {errors.username && <p className="error-message">{errors.username}</p>}
        </label>

        <label>Rol ID:
          <input
            type="number"
            name="rol"
            value={formData.rol}
            onChange={handleChange}
            required
          />
          {errors.rol && <p className="error-message">{errors.rol}</p>}
        </label>

        <button type="submit">Crear Usuario</button>
      </form>
    </div>
  );
};
