package com.example.Proyecto.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.example.Proyecto.domain.Producto;
import com.example.Proyecto.domain.Usuario;
import com.example.Proyecto.domain.Valoracion;
import com.example.Proyecto.repositories.UsuarioRepository;
import com.example.Proyecto.repositories.ValoracionRepository;

@Service
public class ValoracionServiceImpMem  implements ValoracionService{
    @Autowired
    ValoracionRepository valoracionRepository;

    @Autowired
    UsuarioRepository usuarioRepository;

    public Valoracion obtenerPorId(Long id) {
        return valoracionRepository.findById(id).orElse(null);
    }

    public Valoracion añadir(Valoracion valoracion) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (!(authentication instanceof AnonymousAuthenticationToken)) {
            String currentUserName = authentication.getName();
            valoracion.setUsuario(usuarioRepository.findByAlias(currentUserName));
            return valoracionRepository.save(valoracion);
        }
        return null;
    }

    public boolean borrar(Valoracion valoracion) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (!(authentication instanceof AnonymousAuthenticationToken)) {
            String currentUserName = authentication.getName();
            if (valoracion.getUsuario().getAlias().equals(currentUserName)) {
                valoracionRepository.delete(valoracion);
                return true;
            }
        }
        return false;
    }

    public List<Valoracion> obtenerPorUsuario(Usuario usuario) {
        return valoracionRepository.findByUsuario(usuario);
    }

    public List<Valoracion> obtenerPorProducto(Producto producto) {
        return valoracionRepository.findByProducto(producto);
    }

    public Valoracion obtenerPorUsuarioProducto(Usuario usuario, Producto producto) {
        return valoracionRepository.findByUsuarioAndProducto(usuario, producto);
    }
}
