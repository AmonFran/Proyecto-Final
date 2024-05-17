package com.example.Proyecto.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Proyecto.domain.Producto;
import com.example.Proyecto.domain.Usuario;
import com.example.Proyecto.domain.Valoracion;

public interface ValoracionRepository extends JpaRepository<Valoracion, Long> {
    List<Valoracion> findByUsuario(Usuario usuario);

    List<Valoracion> findByProducto(Producto producto);

    Valoracion findByUsuarioAndProducto(Usuario usuario, Producto producto);
}
