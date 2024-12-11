package com.cac.recurso.common;

public class RecursoNotFoundException extends RuntimeException{
    public RecursoNotFoundException(String mensaje){
        super(mensaje);
    }
}