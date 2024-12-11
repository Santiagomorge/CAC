import React, { useEffect, useState } from "react";
import '../../Login/login.css';

export const NuevaVistaRecursos = () => {
  // Simulando un username y un rol (lo puedes cambiar manualmente para probar)
  const [userRole, setUserRole] = useState("admininistrador"); // O "user" para simular otro rol
  const [salas, setSalas] = useState([]);
  const [error, setError] = useState("");
  const [accessDeniedMessage, setAccessDeniedMessage] = useState("");

  // Función que obtiene el rol del usuario
  const fetchUserRole = async () => {
    // Simulando la asignación del rol
    setUserRole("administrador"); // Cambiar entre 'admin' y otro rol para probar
  };

  // Función que obtiene las salas disponibles
  const fetchSalas = async () => {
    try {
      const response = await fetch("http://localhost:8081/recursos/recurso/disponibles");
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

  // useEffect para obtener el rol y las salas
  useEffect(() => {
    fetchUserRole();
    fetchSalas(); // Al cargar el componente, obtenemos las salas
  }, []); // Solo se ejecuta una vez al montar el componente

  useEffect(() => {
    if (userRole === "admin") {
      fetchSalas(); // Si es admin, obtiene las salas
    } else if (userRole && userRole !== "admin") {
      setAccessDeniedMessage("Acceso restringido. Solo los administradores pueden ver las salas.");
    }
  }, [userRole]); // Se ejecuta cada vez que el rol cambie

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
      {accessDeniedMessage && <div className="access-denied-message">{accessDeniedMessage}</div>}
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
