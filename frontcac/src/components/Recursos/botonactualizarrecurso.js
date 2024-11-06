import React from 'react';
import { useNavigate } from 'react-router-dom';

function IrActRecurso (){
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/Actrecursos');
    };

    return (
        <button className='header-button' onClick={handleClick}>
          Actualizar recurso
        </button>
      );
    }
    
export default IrActRecurso;