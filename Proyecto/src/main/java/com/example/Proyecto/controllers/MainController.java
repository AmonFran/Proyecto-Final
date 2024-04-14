package com.example.Proyecto.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.Proyecto.domain.Contactar;
import com.example.Proyecto.services.MainServicios;
import com.example.Proyecto.services.ProductoService;

import jakarta.validation.Valid;

@Controller
@RequestMapping("/publico")
public class MainController {
    @Autowired
    ProductoService productoService;

    @Autowired
    MainServicios mainServicios;

    @GetMapping({ "/index", "/", "/home" })
    public String showIndex(@RequestParam(required = false, defaultValue = "") Integer op, Model model) {
        String mensaje = "";
        if (op != null) {
            mensaje = switch (op) {
                case 1 -> "Has intentado acceder a una pagina a la que no tienes acceso";
                case 2 -> "Contraseña modificada correctamente";
                case 3 -> "No se pudo modificar/crear el usuario, porque ese nombre de usuario ya esta siendo usado";
                case 4 -> "Nombre de usuario modificado correctamente";
                case 5 -> "No se pudo eliminar la valoracion porque no es tuya";
                default -> "";
            };
        }
        model.addAttribute("mensajeError", mensaje);
        model.addAttribute("titulo", "Index");
        return "publico/indexView";
    }

    @GetMapping("/contacta")
    public String showContactUs(Model model) {
        model.addAttribute("titulo", "Contacta");
        model.addAttribute("formInfo", new Contactar());
        return "publico/contactaView";
    }

    @PostMapping("/contacta/submit")
    public String showContactResult(@Valid Contactar formInfo, BindingResult bindingResult, Model model) {
        if (bindingResult.hasErrors()) {
            model.addAttribute("formInfo", new Contactar());
            model.addAttribute("error", true);
            return "publico/contactaView";
        }
        model.addAttribute("nombre", formInfo.getNombre());
        model.addAttribute("email", formInfo.getEmail());
        model.addAttribute("tipo", formInfo.getTipo());
        model.addAttribute("comentario", formInfo.getComentario());
        model.addAttribute("aceptaCondiciones", formInfo.aceptaCondiciones);
        return "publico/contactResultView";
    }

    @GetMapping("/quienes-somos")
    public String showAboutUs(Model model) {
        model.addAttribute("titulo", "Quienes-somos");
        return "publico/aboutUsView";
    }
}
