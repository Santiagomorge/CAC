import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../../Login/login.css';


export const NuevaVistaRecursos = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userRole = location.state?.role; // Obtenemos el rol del usuario
  console.log("User role en NuevaVistaRecursos:", userRole);

  const [salas, setSalas] = useState([]);
  const [error, setError] = useState("");
  const [accessDeniedMessage, setAccessDeniedMessage] = useState("");

  // Función que obtiene las salas disponibles
  const fetchSalas = async () => {
    try {
      const response = await fetch("http://localhost:8081/recursos/recurso/disponibles");
      if (response.ok) {
        const data = await response.json();
        console.log("Salas obtenidas:",data)
        setSalas(data);
      } else {
        throw new Error("Error al cargar las salas.");
      }
    } catch (error) {
      setError("No se pudieron cargar las salas.");
    }
  };

  useEffect(() => {
    console.log("User Role:", userRole)
    if (userRole === "administrador") {
      fetchSalas(); // Si es admin, obtiene las salas
    } else if (userRole && userRole !== "administrador") {
        
      setAccessDeniedMessage("Acceso restringido. Solo los administradores tienen acceso a las salas 😭🫨😵‍💫😖😭 ");
    }
  }, [userRole]); // Se ejecuta cada vez que el rol cambie

  const handleSalaClick = (sala) => {
    if (userRole !== "administrador") {
      alert("No tienes acceso a esta sala.");
    } else {
      alert(`Entrando a la sala: ${sala.nombre}`);
    }
  };

  const handleRedirect = () => {
    navigate("/login-recursos"); // Redirige al formulario de inicio de sesión
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="recursos-container">
      <h1>Salas Disponibles</h1>
      <br></br>
          <button className="ingresar" onClick={handleRedirect}>Volver al inicio de sesión</button> {/* Botón de redirección */}
          <br></br>
          <br></br>
      {accessDeniedMessage && (
        <div className="access-denied-message">
          {accessDeniedMessage}
          
        </div>
      )}
      <div className="salas-grid">
        {salas.map((sala) => (
          <div
            key={sala.id}
            className={`sala-card ${userRole !== "administrador" ? "sala-restricted" : ""}`}
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
