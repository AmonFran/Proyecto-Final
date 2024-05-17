package com.example.Proyecto.domain;

import java.util.List;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
@Entity
public class Producto {
    @GeneratedValue
    @Id
    private Long id;
    private String nombre;
    private Double precio;
    private Long stock;
    private String imagen;
    // private List<String> caracteristicas;
    // private String descripcion;
    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Categoria categoria;

    // public Producto(Long id, String nombre, Double precio, Long stock, String imagen, Categoria categoria) {
    //     this.id = id;
    //     this.nombre = nombre;
    //     this.precio = precio;
    //     this.stock = stock;
    //     this.imagen = imagen;
    //     this.categoria = categoria;
    // }

}