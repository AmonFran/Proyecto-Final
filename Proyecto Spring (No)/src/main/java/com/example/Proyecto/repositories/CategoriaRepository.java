package com.example.Proyecto.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Proyecto.domain.Categoria;

public interface CategoriaRepository extends JpaRepository<Categoria, Long>{
    
}
