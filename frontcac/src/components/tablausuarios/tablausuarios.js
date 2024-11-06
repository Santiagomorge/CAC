import React, {useState, useEffect} from "react"
import { useNavigate } from "react-router-dom";
import '../../App.css';  
import IrCrearUsuario from "../botoncrearusuario";
import IrActUsuario from "../botonactualizarusuario";


export const TablaUsuarios = () => {

    //cont almacenar datos de usuarios
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/usuario/api/v1/users')
          .then((response) => {
            if (!response.ok) {
              throw new Error('Error en la respuesta de la API');
            }
            return response.json();
          })
          .then((result) => {
            console.log("Datos recibidos:", result);
            setUsuarios(result.data);
          })
          .catch((error) => console.error('Error al cargar usuarios:', error));
    }, []);

    // Función para actualizar usuario
const actualizarUsuario = (id) => {
    // Lógica para actualizar el usuario (puede ser redirigir a un formulario o abrir un modal)
    console.log(`Actualizar usuario con ID: ${id}`);
  };
  
  // Función para activar o inactivar usuario
  const activarInactivarUsuario = (id) => {
    // Puedes enviar una solicitud al backend para cambiar el estado activo del usuario
    console.log(`Activar/Inactivar usuario con ID: ${id}`);
    // Aquí deberías hacer una llamada al backend para actualizar el estado del usuario
  };


  

    
    return <div >
      <br></br>
      <IrCrearUsuario />
      <br></br>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre de Usuario</th>
            <th>Tipo de Usuario</th>
            <th>Acción</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.username}</td>
              <td>{usuario.rol.name}</td>
              <td>
              <IrActUsuario />
              </td>
              <td>{usuario.estadoEnum}</td>
            </tr>
          ))}
        </tbody>
      </table>
    
    </div>
}