package com.example.Proyecto.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Contactar {
    @NotNull
    @Id
    private String nombre;
    @Email
    private String email;
    private Integer tipo;
    private String comentario;
    @AssertTrue
    public boolean aceptaCondiciones;

}
