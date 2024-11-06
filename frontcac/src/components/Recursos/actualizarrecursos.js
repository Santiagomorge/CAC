import React,  {useState }from "react"
import '../actualizarusuario/actualizarusuario.css'
import { useNavigate } from "react-router-dom"

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
            <label>ID:
              <input type="text" name="id" value={formData.id} onChange={handleChange} required />
            </label>
            <label>Fecha creación:
              <input type="datetime-local" name="fechaCreacion" value={formData.fechaCreacion} onChange={handleChange} required />
            </label>
            <label>Fecha actualización:
              <input type="datetime-local" name="fechaActualizacion" value={formData.fechaActualizacion} onChange={handleChange} required />
            </label>
            <label>Estado:
              <select name="estadoRegistro" value={formData.estadoRegistro} onChange={handleChange} required>
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
            <button type="submit">Actualizar recurso</button>
          </form>
        </div>
    );
}
