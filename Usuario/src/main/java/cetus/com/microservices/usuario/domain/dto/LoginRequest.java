package cetus.com.microservices.usuario.domain.dto;

import lombok.Data;



@Data
public class LoginRequest {
    // Getters and Setters
    private String username;
    private String password;
}
