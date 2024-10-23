package cetus.com.microservices.usuario.domain.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateUserDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    private Integer id;

    private String username;

    @Size(min = 6, message = "La contraseña debe tener como minimo 6 caracteres")
    private String password;

    @Pattern(regexp = "ACTIVO|INACTIVO", message = "El estado debe ser ACTIVO o INACTIVO")
    private String estadoEnum;

    @NotNull(message = "Se requiere el id del empleado")
    private Integer employee_id;

    private Long rol;
}
