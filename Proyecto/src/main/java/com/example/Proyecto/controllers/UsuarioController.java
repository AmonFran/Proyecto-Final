package com.example.Proyecto.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.Proyecto.domain.Usuario;
import com.example.Proyecto.domain.UsuarioContrDto;
import com.example.Proyecto.domain.UsuarioDatosDto;
import com.example.Proyecto.services.UsuarioService;

@Controller
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    UsuarioService usuarioService;

    @GetMapping("")
    public String mostrarTodos(Model model) {
        model.addAttribute("titulo", "Usuarios");
        model.addAttribute("listaUsuarios", usuarioService.obtenerTodos());
        return "usuarios/usuariosView";
    }

    @GetMapping("/nuevo")
    public String nuevoUsuario(Model model) {
        model.addAttribute("titulo", "Añadir usuario");
        model.addAttribute("nuevoUsuario", new Usuario());
        return "usuarios/nuevoUsuarioView";
    }

    @PostMapping("/nuevo/submit")
    public String postNuevoUsuario(Usuario usuario) {
        usuarioService.añadir(usuario);
        return "redirect:/usuarios";
    }

    @GetMapping("/borrar/{id}")
    public String borrarUsuario(@PathVariable Long id) {
        usuarioService.borrar(id);
        return "redirect:/usuarios";
    }

    @GetMapping("/editar/{id}")
    public String editarUsuario(@PathVariable Long id, Model model) {
        model.addAttribute("titulo", "Editar usuario");
        model.addAttribute("editarUsuario", usuarioService.obtenerPorId(id));
        return "usuarios/editarUsuarioView";
    }

    @PostMapping("/editar/submit")
    public String postEditarUsuario(Usuario usuario) {
        usuarioService.remplazar(usuario);
        return "redirect:/usuarios";
    }

    @GetMapping("/editarContr")
    public String editarUsuarioContrConectado(Model model) {
        Usuario usuario = usuarioService.obtenerUsuarioConectado();
        model.addAttribute("editUsuarioContrDto", usuarioService.convertirAUsuarioContrDto(usuario));
        return "usuarios/editarContraseñaUsuarioView";
    }

    @PostMapping("/editarContr/submit")
    public String resultEditarContrUsuario(UsuarioContrDto usuarioContrDto) {
        usuarioService.cambiarContraseña(usuarioContrDto);
        return "redirect:/publico/?op=2";
    }

    @GetMapping("/editarDatos")
    public String editarUsuarioNombConectado(Model model) {
        Usuario usuario = usuarioService.obtenerUsuarioConectado();
        model.addAttribute("editUsuarioDatosDto", usuarioService.convertirAUsuarioDatosDto(usuario));
        return "usuarios/editarDatosUsuarioView";
    }

    @PostMapping("/editarDatos/submit")
    public String resulteditarDatosUsuario(UsuarioDatosDto usuarioDatosDto) {
        Usuario usuario = usuarioService.cambiarDatos(usuarioDatosDto);
        if (usuario == null) {
            return "redirect:/publico/?op=3";
        }
        // Esto desconecta al usuario al cambiar su nombre de usuario
        // Esto es para evitar errores, porque es el nombre el que identifica alusuario.
        // Y no se modifica la sesion iniciada al realizar el cambio
        SecurityContextHolder.getContext().setAuthentication(null);
        return "redirect:/publico/?op=4";
    }

    @GetMapping("/registro")
    public String registroUsuario(Model model) {
        model.addAttribute("nuevoUsuario", new Usuario());
        return "usuarios/registrarUsuario";
    }

    @PostMapping("/registro/submit")
    public String registroUsuarioResult(Usuario usuario) {
        usuario = usuarioService.añadir(usuario);
        if (usuario == null) {
            return "redirect:/publico/?op=3";
        }
        return "redirect:/usuarios";
    }
}
