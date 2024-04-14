package com.example.Proyecto.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Proyecto.domain.DetallesPedido;
import com.example.Proyecto.domain.Pedido;
import com.example.Proyecto.repositories.DetallesPedidoRepository;

@Service
public class DetallesPedidoServiceImplMem implements DetallesPedidoService {

    @Autowired
    DetallesPedidoRepository detallesPedidoRepository;

    public DetallesPedido añadir(DetallesPedido detallesPedido) {
        Double coste = (detallesPedido.getCantidad() * detallesPedido.getProducto().getPrecio());
        detallesPedido.getPedido().setTotalPago(detallesPedido.getPedido().getTotalPago() + coste);
        return detallesPedidoRepository.save(detallesPedido);
    }

    public List<DetallesPedido> obtenerTodos() {
        return detallesPedidoRepository.findAll();
    }

    public DetallesPedido obtenerPorId(Long id) {
        return detallesPedidoRepository.findById(id).orElse(null);
    }

    public void borrar(Long id) {
        DetallesPedido aux = this.obtenerPorId(id);
        if (aux != null) {
            Double coste = (aux.getCantidad() * aux.getProducto().getPrecio());
            aux.getPedido().setTotalPago(aux.getPedido().getTotalPago() - coste);
            detallesPedidoRepository.deleteById(id);
        }
    }

    public List<DetallesPedido> obtenerPorPedido(Pedido pedido) {
        return detallesPedidoRepository.findByPedido(pedido);
    }

}
