package com.example.Proyecto.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Proyecto.domain.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Usuario findByAlias(String alias);
}
