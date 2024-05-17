package com.example.Proyecto.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Proyecto.domain.Categoria;
import com.example.Proyecto.domain.Producto;


public interface ProductoRepository extends JpaRepository<Producto, Long>{
    List<Producto> findByCategoria(Categoria categoria);
}
