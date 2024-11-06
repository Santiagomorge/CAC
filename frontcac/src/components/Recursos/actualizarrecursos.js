import React,  {useState }from "react"
import '../actualizarusuario/actualizarusuario.css'
import { useNavigate } from "react-router-dom"

export const ActualizarRecurso = () => {
    const [formData, setFormData] = useState({
        fechaCreacion: '',
        fechaActualizacion: '',
        estadoRegistro: '',
        nombre: '',
        cantidad: ''
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

        
        fetch(`http://localhost:8081/recursos/recurso/actualizar/${formData.id}`, {
            method: 'PUT' , 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => {
            if (!response.ok){
                throw new Error('Error al actualizar recurso');
            }
            return response.json();
        })
        .then((data) => {
            console.log('Recurso actualizado:',data);
            navigate('/recursos');
        })
        .catch((error) => console.error('Error',error));
      };

    return (
        <div>
            <p class="Titulo-texto">Actualizar recurso</p>
          
          <form onSubmit={handleSubmit}>
            <label>Fecha creación:
              <input type="datetime-local" name="fechaCreacion" value={formData.fechaCreacion} onChange={handleChange} required />
            </label>
            <label>Fecha actualización:
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
