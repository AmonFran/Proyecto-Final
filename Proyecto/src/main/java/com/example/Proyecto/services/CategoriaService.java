package com.example.Proyecto.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.Proyecto.domain.Categoria;

@Service
public interface CategoriaService {

    public Categoria añadir(Categoria categoria);

    public List<Categoria> obtenerTodos();

    public void remplazar(Categoria categoria);

    public Categoria obtenerPorId(Long id);

    public void borrar(Long id);

}
