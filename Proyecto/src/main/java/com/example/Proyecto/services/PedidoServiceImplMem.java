package com.example.Proyecto.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Proyecto.domain.Pedido;
import com.example.Proyecto.domain.Usuario;
import com.example.Proyecto.repositories.PedidoRepository;

@Service
public class PedidoServiceImplMem implements PedidoService {
    @Autowired
    PedidoRepository pedidoRepository;

    public Pedido añadir(Pedido pedido) {
        pedido.setTotalPago(0D);
        return pedidoRepository.save(pedido);
    }

    public List<Pedido> obtenerTodos() {
        return pedidoRepository.findAll();
    }

    public void remplazar(Pedido pedido) {
        pedidoRepository.save(pedido);
    }

    public Pedido obtenerPorId(Long id) {
        return pedidoRepository.findById(id).orElse(null);
    }

    public void borrar(Long id) {
        pedidoRepository.deleteById(id);

    }

    public List<Pedido> obtenerPorUsuario(Usuario usuario) {
        return pedidoRepository.findByUsuario(usuario);
    }

}
