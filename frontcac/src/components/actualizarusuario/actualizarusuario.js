import React, {useState} from "react";
import './actualizarusuario.css';  
import { useNavigate, useParams } from 'react-router-dom';

export const ActualizarUsuario = () => {
    const [formData, setFormData] = useState({
        id: '',
        employee_id: '',
        estadoEnum: '',
        password: '',
        username: '',
        rol: ''
      });

      const navigate = useNavigate();

      //maneja los cambios en el form
      const handleChange = (e) => {
        const {name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
      };

      //enviar datos al back
      const handleSubmit = (e) => {
        e.preventDefault();


        fetch(`http://localhost:8080/usuario/api/v1/users/${formData.id}`, {
            method: 'PUT' , 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => {
            if (!response.ok){
                throw new Error('Error al actualizar usuario');
            }
            return response.json();
        })
        .then((data) => {
            console.log('Usuario actualizado:',data);
            navigate('/');
        })
        .catch((error) => console.error('Error',error));
      };


      return (
        <div>
            <p class="Titulo-texto">Actualizar usuario</p>
          
          <form onSubmit={handleSubmit}>
            <label>ID:
              <input type="text" name="id" value={formData.id} onChange={handleChange} required />
            </label>
            <label>Empleado ID:
              <input type="text" name="employee_id" value={formData.employee_id} onChange={handleChange} required />
            </label>
            <label>Estado:
              <select name="estadoEnum" value={formData.estadoEnum} onChange={handleChange} required>
                <option value="">Seleccione</option>
                <option value="ACTIVO">ACTIVO</option>
                <option value="INACTIVO">INACTIVO</option>
              </select>
            </label>
            <label>Contraseña:
              <input type="password" name="password" value={formData.password} onChange={handleChange} required />
            </label>
            <label>Username:
              <input type="text" name="username" value={formData.username} onChange={handleChange} required />
            </label>
            <label>Rol ID:
              <input type="text" name="rol" value={formData.rol} onChange={handleChange} required />
            </label>
            <button type="submit">Actualizar Usuario</button>
          </form>
        </div>
      );
}

