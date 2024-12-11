package com.cac.visitantes.common;

public class VisitanteYaExistenteException extends RuntimeException{
    public VisitanteYaExistenteException(String email) {
        super("El visitante con el email " + email + " ya existe.");
    }
}