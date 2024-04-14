package com.example.Proyecto.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Proyecto.domain.Producto;

public interface ProductoRepository extends JpaRepository<Producto, Long>{
    
}
