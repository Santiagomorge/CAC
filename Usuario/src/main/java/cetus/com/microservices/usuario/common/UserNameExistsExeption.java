package cetus.com.microservices.usuario.common;

public class UserNameExistsExeption extends  RuntimeException{
    public UserNameExistsExeption(String message) {
        super(message);
    }
}
