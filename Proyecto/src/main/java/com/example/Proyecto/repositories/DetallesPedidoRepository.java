package com.example.Proyecto.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Proyecto.domain.DetallesPedido;
import com.example.Proyecto.domain.Pedido;
import java.util.List;


public interface DetallesPedidoRepository extends JpaRepository<DetallesPedido, Long> {
    List<DetallesPedido> findByPedido(Pedido pedido);
}
