package com.cac.visitantes.domain.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class VisitantesDto {
    private Long id;

    @NotBlank(message = "El nombre no puede estar vacío.")
    @Size(max = 100, message = "El nombre no puede tener más de 100 caracteres.")
    private String nombre;

    private boolean  tipoIdentificacion;

    @NotBlank(message = "El número de identificación no puede estar vacío.")
    private String numeroIdentificacion;

    @NotBlank(message = "El email no puede estar vacío.")
    @Email(message = "El email debe tener un formato válido.")
    private String email;

    private String urlFoto;

    private boolean estado;
}