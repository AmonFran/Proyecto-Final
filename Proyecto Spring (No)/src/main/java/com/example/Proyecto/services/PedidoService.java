package com.example.Proyecto.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.Proyecto.domain.Pedido;
import com.example.Proyecto.domain.Usuario;

@Service
public interface PedidoService {
    public Pedido añadir(Pedido pedido);

    public List<Pedido> obtenerTodos();

    public void remplazar(Pedido pedido);

    public Pedido obtenerPorId(Long id);

    public void borrar(Long id);

    public List<Pedido> obtenerPorUsuario(Usuario usuario);
}