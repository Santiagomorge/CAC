import React from 'react';
import { useNavigate } from 'react-router-dom';

function IrActUsuario (){
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/Actusuarios');
    };

    return (
        <button className='header-button' onClick={handleClick}>
          Actualizar usuario
        </button>
      );
    }
    
export default IrActUsuario;
    