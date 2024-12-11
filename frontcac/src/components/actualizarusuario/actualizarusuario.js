import React, { useState } from "react";
import './actualizarusuario.css';
import { useNavigate } from 'react-router-dom';

export const ActualizarUsuario = () => {
  const irUsuarios = () => {
    navigate('/usuarios');
};

  const [formData, setFormData] = useState({
    id: '',
    estadoEnum: '',
    password: '',
    username: '',
    rol: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null); // Para almacenar los datos del usuario
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

  // Llama a la API para obtener los datos del usuario cuando se ingresa el ID
  const handleIdChange = (e) => {
    const id = e.target.value;
    setFormData({ ...formData, id });
    setUserData(null); // Limpiar datos previos
    setErrors({}); // Limpiar errores al cambiar el ID

    if (id) {
      setLoading(true);
      fetch(`http://localhost:8080/usuario/api/v1/users/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Usuario no encontrado'); // Error si no se encuentra el usuario
          }
          return response.json();
        })
        .then((data) => {
          setUserData(data.data);  // Cambiar a `data.data`
          setFormData({
            id: data.data.id,
            estadoEnum: data.data.estadoEnum || '',
            password: '', // Mantener vacío para que puedas modificarla
            username: data.data.username || '',
            rol: data.data.rol || ''
          });
        })
        .catch((error) => {
          setErrors({ id: error.message }); // Mostrar error solo si no se encuentra el usuario
          setUserData(null); // Limpiar los datos previos si ocurre un error
        })
        .finally(() => setLoading(false));
    }
  };

  // Valida los datos antes de enviar
  const validate = () => {
    const newErrors = {};
    if (!formData.id) {
      newErrors.id = "El ID es obligatorio.";
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

    setLoading(true);

    // Si no hay cambios en los campos, los datos previos se mantienen
    const updatedData = {
      id: formData.id,
      estadoEnum: formData.estadoEnum || userData.estadoEnum,
      password: formData.password || userData.password,
      username: formData.username || userData.username,
      rol: formData.rol || userData.rol
    };

    // Actualizar usuario
    fetch(`http://localhost:8080/usuario/api/v1/users/${formData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al actualizar usuario');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Usuario actualizado:', data);
        navigate('/usuarios');  // Redirige a la página principal o a la lista de usuarios
      })
      .catch((error) => {
        setErrors({ id: error.message });
        console.error('Error:', error);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div>
      <p className="Titulo-texto">Actualizar usuario</p>

      <form onSubmit={handleSubmit}>
        <label>ID:
          <input
            type="number"
            name="id"
            value={formData.id}
            onChange={handleIdChange} // Cambia el manejador para ID
            required
          />
          {errors.id && <p className="error-message">{errors.id}</p>}
        </label>

        {userData ? (
          <>
            <label>Estado:
              <select
                name="estadoEnum"
                value={formData.estadoEnum}
                onChange={handleChange}
              >
                <option value="">Seleccione</option>
                <option value="ACTIVO">ACTIVO</option>
                <option value="INACTIVO">INACTIVO</option>
              </select>
            </label>

            <label>Contraseña:
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </label>

            <label>Nombre de Usuario:
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </label>

            <label>Rol ID:
              <input
                type="number"
                name="rol"
                value={formData.rol}
                onChange={handleChange}
              />
            </label>
          </>
        ) : (
          <p>{userData === null ? "Cargando datos del usuario..." : "Usuario no encontrado"}</p>
        )}

        <button type="submit" disabled={loading} >
          {loading ? 'Actualizando...' : 'Actualizar Usuario'}
        </button>
      </form>
    </div>
  );
};
