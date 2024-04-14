package com.example.Proyecto.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Proyecto.domain.Categoria;
import com.example.Proyecto.repositories.CategoriaRepository;

@Service
public class CategoriaServiceImplMem implements CategoriaService {

    @Autowired
    CategoriaRepository categoriaRepository;

    public Categoria añadir(Categoria categoria) {
        return categoriaRepository.save(categoria);
    }

    public List<Categoria> obtenerTodos() {
        return categoriaRepository.findAll();
    }

    public void remplazar(Categoria categoria) {
        if (categoriaRepository.findById(categoria.getId()) != null) {
            categoriaRepository.save(categoria);
        }
    }

    public Categoria obtenerPorId(Long id) {
        return categoriaRepository.findById(id).orElse(null);
    }

    public void borrar(Long id) {
        categoriaRepository.deleteById(id);
    }
}
