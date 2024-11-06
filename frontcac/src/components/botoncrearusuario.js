import React from 'react';
import { useNavigate } from 'react-router-dom';

function IrCrearUsuario() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/crearusuarios');
  };

  return (
    <button className='header-button' onClick={handleClick}>
      Crear usuario
    </button>
  );
}

export default IrCrearUsuario;

