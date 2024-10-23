package cetus.com.microservices.usuario.domain.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class UserEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(unique = true, nullable = false)
    private String username;

    @Size(min = 6, message = "La contraseña debe tener como minimo 6 caracteres")
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado")
    private StatusEnum estadoEnum;

    @Column(name = "empleado_id")
    private Integer employee_id;

    @ManyToOne
    @JoinColumn(name = "rol_id")
    private Role rol;

}
