import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import IrCrearUsuario from "../botoncrearusuario";
import IrActUsuario from "../botonactualizarusuario";

export const TablaUsuarios = () => {
  //cont almacenar datos de usuarios
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/usuario/api/v1/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la respuesta de la API");
        }
        return response.json();
      })
      .then((result) => {
        console.log("Datos recibidos:", result);
        setUsuarios(result.data);
      })
      .catch((error) => console.error("Error al cargar usuarios:", error));
  }, []);

  return (
    <div>
      <br></br>
      <IrCrearUsuario />
      <br></br>
      <IrActUsuario />
      <br></br>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre de Usuario</th>
            <th>Tipo de Usuario</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.username}</td>
              <td>{usuario.rol.name}</td>
              <td>{usuario.estadoEnum}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
