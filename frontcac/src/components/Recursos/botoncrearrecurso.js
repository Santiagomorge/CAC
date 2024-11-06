import React from "react";
import { useNavigate } from "react-router-dom";

function IrCrearRecurso(){
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/crearrecursos');
    };

    return (
        <button className='header-button' onClick={handleClick}>
      Crear recurso
    </button>
    )
}

export default IrCrearRecurso;