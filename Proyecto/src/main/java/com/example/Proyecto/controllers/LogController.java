package com.example.Proyecto.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class LogController {
    @GetMapping("/signin")
    public String showLogin(Model model) {
        model.addAttribute("titulo", "Inicio de sesion");
        return "sign/inicioSesion";
    }

    @GetMapping("/signout")
    public String showLogout(Model model) {
        model.addAttribute("titulo", "Cerrar sesion");
        return "sign/signoutView";
    }

    @GetMapping("/registrarse")
    public String showRegistro(Model model) {
        model.addAttribute("titulo", "Registro");
        return "sign/registrarUsuario";
    }
}