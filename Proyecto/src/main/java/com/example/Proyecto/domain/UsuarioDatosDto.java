package com.example.Proyecto.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class UsuarioDatosDto {
    private Long id;
    private String alias;
    private String nombre;
    private String apellido;
    private String direccion;
}
