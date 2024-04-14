package com.example.Proyecto.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.Proyecto.domain.Categoria;
import com.example.Proyecto.services.CategoriaService;

@Controller
@RequestMapping("/categorias")
public class CategoriaController {
    @Autowired
    CategoriaService categoriaService;

    @GetMapping("")
    public String showCategoria(Model model) {
        model.addAttribute("listaCategorias", categoriaService.obtenerTodos());
        model.addAttribute("titulo", "Categorias");
        return "categorias/categoriaView";
    }

    @GetMapping("/nuevo")
    public String showNuevaCategoria(Model model) {
        model.addAttribute("nuevaCategoria", new Categoria());
        model.addAttribute("titulo", "Añadir categoria");
        return "categorias/nuevaCategoriaView";
    }

    @PostMapping("/nuevo/submit")
    public String showCategoriaResult(Categoria categoria) {
        categoriaService.añadir(categoria);
        return "redirect:/categorias";
    }

    @GetMapping("/editar/{id}")
    public String editcategoria(@PathVariable Long id, Model model) {
        model.addAttribute("editCategoria", categoriaService.obtenerPorId(id));
        model.addAttribute("titulo", "Editar categoria");
        return "categorias/editarCategoriaView";
    }

    @PostMapping("/editar/submit")
    public String resultEditarcategoria(Categoria categoria) {
        categoriaService.remplazar(categoria);
        return "redirect:/categorias";
    }

    @GetMapping("/borrar/{id}")
    public String borrarCategoria(@PathVariable Long id) {
        categoriaService.borrar(id);
        return "redirect:/categorias";
    }
}
