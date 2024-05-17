package com.example.Proyecto.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Proyecto.domain.Categoria;
import com.example.Proyecto.domain.Producto;
import com.example.Proyecto.repositories.ProductoRepository;

@Service
public class ProductoServiceImplMem implements ProductoService {
    @Autowired
    ProductoRepository productoRepository;

    @Override
    public Producto añadir(Producto producto) {
        return productoRepository.save(producto);
    }

    @Override
    public List<Producto> obtenerTodos() {
        return productoRepository.findAll();
    }

    @Override
    public List<Producto> obtenerPorCategoria(Categoria categoria) {
        return productoRepository.findByCategoria(categoria);
    }

    @Override
    public void remplazar(Producto producto) {
        productoRepository.save(producto);
    }

    @Override
    public Producto obtenerPorId(Long id) {
        return productoRepository.findById(id).orElse(null);
    }

    @Override
    public void borrar(Long id) {
        productoRepository.deleteById(id);
    }
}
