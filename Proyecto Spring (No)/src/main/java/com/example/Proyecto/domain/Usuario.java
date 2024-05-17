package com.example.Proyecto.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "alias")
@Entity
public class Usuario {
    @Id
    @GeneratedValue
    private Long id;
    
    @Column(unique = true)
    private String alias;
    private String nombre;
    private String apellido;
    private String contrasenha;
    private String direccion;
    private Rol rol = Rol.USER;
}
