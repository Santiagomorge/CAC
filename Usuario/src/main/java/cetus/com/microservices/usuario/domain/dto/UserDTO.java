package cetus.com.microservices.usuario.domain.dto;

import cetus.com.microservices.usuario.domain.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {

    private Integer id;
    private String username;
    private String estadoEnum;
    private Integer employee_id;
    private Role rol;
}
