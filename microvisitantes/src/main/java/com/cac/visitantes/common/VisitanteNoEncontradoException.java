package com.cac.visitantes.common;

public class VisitanteNoEncontradoException extends RuntimeException{
    public VisitanteNoEncontradoException(Long id) {
        super("Visitante no encontrado con ID: " + id);
    }
}