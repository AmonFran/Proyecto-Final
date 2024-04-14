package com.example.Proyecto.services;

import java.util.List;

import com.example.Proyecto.domain.Producto;
import com.example.Proyecto.domain.Usuario;
import com.example.Proyecto.domain.Valoracion;

public interface ValoracionService {
    public Valoracion obtenerPorId(Long id);

    public Valoracion añadir(Valoracion valoracion);

    public boolean borrar(Valoracion valoracion);

    public List<Valoracion> obtenerPorUsuario(Usuario usuario);

    public List<Valoracion> obtenerPorProducto(Producto producto);

    public Valoracion obtenerPorUsuarioProducto(Usuario usuario, Producto producto);
}
