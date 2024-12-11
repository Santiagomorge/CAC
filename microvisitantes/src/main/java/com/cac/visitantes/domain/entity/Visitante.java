package com.cac.visitantes.domain.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "Visitantes")
@Entity
public class Visitante {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;

    private boolean  tipoIdentificacion;

    private String numeroIdentificacion;

    private String email;

    private String urlFoto;

    private boolean estado;

    LocalDateTime fechaCreacion;

    LocalDateTime fechaActualizacion;
}