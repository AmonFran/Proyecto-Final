package com.example.Proyecto.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.Proyecto.domain.Producto;

@Service
public interface ProductoService {

    public Producto añadir(Producto producto);

    public List<Producto> obtenerTodos();

    public void remplazar(Producto producto);

    public Producto obtenerPorId(Long id);

    public void borrar(Long id);
}
