package com.example.Proyecto.domain;

import java.time.LocalDate;

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
public class Pedido {

    @Id
    @GeneratedValue
    private Long id;
    private LocalDate fecha = LocalDate.now();
    private Double totalPago;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Usuario usuario;

    public Pedido(Long id, Usuario usuario) {
        this.id = id;
        this.fecha = LocalDate.now();
        this.totalPago = 0D;
        this.usuario = usuario;
    }
}
