package com.example.Proyecto.services;

import java.util.List;

import com.example.Proyecto.domain.DetallesPedido;
import com.example.Proyecto.domain.Pedido;

public interface DetallesPedidoService {
    public DetallesPedido añadir(DetallesPedido detallesPedido);

    public List<DetallesPedido> obtenerTodos();

    public DetallesPedido obtenerPorId(Long id);

    public void borrar(Long id);

    public List<DetallesPedido> obtenerPorPedido(Pedido pedido);
}
