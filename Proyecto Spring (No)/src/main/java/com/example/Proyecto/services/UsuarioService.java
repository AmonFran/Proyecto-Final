package com.example.Proyecto.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.Proyecto.domain.Usuario;
import com.example.Proyecto.domain.UsuarioContrDto;
import com.example.Proyecto.domain.UsuarioDatosDto;

@Service
public interface UsuarioService {

    public Usuario añadir(Usuario usuario);

    public List<Usuario> obtenerTodos();

    public void remplazar(Usuario usuario);

    public Usuario obtenerPorId(Long id);

    public void borrar(Long id);

    public Usuario obtenerUsuarioConectado();

    public UsuarioContrDto convertirAUsuarioContrDto(Usuario usuario);

    public Usuario cambiarContraseña(UsuarioContrDto usuarioContrDto);

    public UsuarioDatosDto convertirAUsuarioDatosDto(Usuario usuario);

    public Usuario cambiarDatos(UsuarioDatosDto usuarioDatosDto);
}
