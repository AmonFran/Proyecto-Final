package com.example.Proyecto.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.Proyecto.domain.Usuario;
import com.example.Proyecto.domain.UsuarioContrDto;
import com.example.Proyecto.domain.UsuarioDatosDto;
import com.example.Proyecto.repositories.UsuarioRepository;

@Service
public class UsuarioServiceImplMem implements UsuarioService {
    @Autowired
    UsuarioRepository usuarioRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    public Usuario añadir(Usuario usuario) {
        Usuario existe = usuarioRepository.findByAlias(usuario.getAlias());
        if (existe == null) {
            usuario.setContrasenha(passwordEncoder.encode(usuario.getContrasenha()));
            return usuarioRepository.save(usuario);
        }
        return null;
    }

    public List<Usuario> obtenerTodos() {
        return usuarioRepository.findAll();
    }

    public void remplazar(Usuario usuario) {
        if (this.obtenerPorId(usuario.getId()) != null) {
            usuario.setContrasenha(passwordEncoder.encode(usuario.getContrasenha()));
            usuarioRepository.save(usuario);
        }
    }

    public Usuario obtenerPorId(Long id) {
        return usuarioRepository.findById(id).orElse(null);
    }

    public void borrar(Long id) {
        usuarioRepository.deleteById(id);
    }

    public Usuario obtenerUsuarioConectado() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (!(authentication instanceof AnonymousAuthenticationToken)) {
            String currentUserName = authentication.getName();
            return usuarioRepository.findByAlias(currentUserName);
        }
        return null;
    }

    public UsuarioContrDto convertirAUsuarioContrDto(Usuario usuario) {
        UsuarioContrDto usuarioContrDto = new UsuarioContrDto();
        usuarioContrDto.setId(usuario.getId());
        return usuarioContrDto;
    }

    public Usuario cambiarContraseña(UsuarioContrDto usuarioContrDto) {
        Usuario usuario = this.obtenerUsuarioConectado();
        if (usuario != null) {
            usuario.setContrasenha(passwordEncoder.encode(usuarioContrDto.getContrasenha()));
            return usuarioRepository.save(usuario);
        }
        return null;
    }

    public UsuarioDatosDto convertirAUsuarioDatosDto(Usuario usuario) {
        UsuarioDatosDto usuarioNomDto = new UsuarioDatosDto();
        usuarioNomDto.setId(usuario.getId());
        usuarioNomDto.setAlias(usuario.getAlias());
        usuarioNomDto.setNombre(usuario.getNombre());
        usuarioNomDto.setApellido(usuario.getApellido());
        usuarioNomDto.setDireccion(usuario.getDireccion());
        return usuarioNomDto;
    }

    public Usuario cambiarDatos(UsuarioDatosDto usuarioDatosDto) {
        Usuario usuario = this.obtenerUsuarioConectado();
        Usuario existe = usuarioRepository.findByAlias(usuarioDatosDto.getAlias());
        if (existe == null) {
            if (usuario != null) {
                usuario.setAlias(usuarioDatosDto.getAlias());
                usuario.setNombre(usuarioDatosDto.getNombre());
                usuario.setApellido(usuarioDatosDto.getApellido());
                usuario.setDireccion(usuarioDatosDto.getDireccion());
                return usuarioRepository.save(usuario);
            }
        }
        return null;
    }
}
