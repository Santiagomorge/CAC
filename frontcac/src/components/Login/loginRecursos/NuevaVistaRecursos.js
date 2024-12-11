import React, {useEffect, useState} from "react";
import '../../Login/login.css';

export const NuevaVistaRecursos = ({userRole}) => {
  

    const [salas, setSalas] = useState([]);
    const [error, setError] = useState("");
  
    useEffect(() => {
      // Simula la obtención de datos de un API
      const fetchSalas = async () => {
        try {
          const response = await fetch("http://localhost:8080/api/v1/salas");
          if (response.ok) {
            const data = await response.json();
            setSalas(data);
          } else {
            throw new Error("Error al cargar las salas.");
          }
        } catch (error) {
          setError("No se pudieron cargar las salas.");
        }
      };
  
      fetchSalas();
    }, []);
  
    const handleSalaClick = (sala) => {
      if (userRole !== "admin") {
        alert("No tienes acceso a esta sala.");
      } else {
        alert(`Entrando a la sala: ${sala.nombre}`);
      }
    };
  
    if (error) {
      return <div className="error-message">{error}</div>;
    }
  
    return (
      <div className="recursos-container">
        <h1>Salas Disponibles</h1>
        <div className="salas-grid">
          {salas.map((sala) => (
            <div
              key={sala.id}
              className={`sala-card ${userRole !== "admin" ? "sala-restricted" : ""}`}
              onClick={() => handleSalaClick(sala)}
            >
              <h2>{sala.nombre}</h2>
              <p>{sala.descripcion}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };