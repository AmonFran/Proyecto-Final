package com.example.Proyecto.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.Proyecto.domain.Producto;
import com.example.Proyecto.services.CategoriaService;
import com.example.Proyecto.services.ProductoService;

@Controller
@RequestMapping("/productos")
public class ProductoController {

    @Autowired
    ProductoService productoService;
    @Autowired
    CategoriaService categoriaService;

    @GetMapping("")
    public String showProductos(Model model) {
        model.addAttribute("listaProductos", productoService.obtenerTodos());
        model.addAttribute("titulo", "Productos");
        return "productos/productosView";
    }

    @GetMapping("/nuevo")
    public String nuevoProducto(Model model) {
        model.addAttribute("nuevoProducto", new Producto());
        model.addAttribute("listaCategorias", categoriaService.obtenerTodos());
        model.addAttribute("titulo", "Añadir producto");
        return "productos/nuevoProductoView";
    }

    @PostMapping("/nuevo/submit")
    public String añadirProducto(Producto producto) {
        productoService.añadir(producto);
        return "redirect:/productos";
    }

    @GetMapping("/borrar/{id}")
    public String borrarProducto(@PathVariable Long id) {
        productoService.borrar(id);
        return "redirect:/productos";
    }

    @GetMapping("/editar/{id}")
    public String editProducto(@PathVariable Long id, Model model) {
        model.addAttribute("editarProducto", productoService.obtenerPorId(id));
        model.addAttribute("listaCategorias", categoriaService.obtenerTodos());
        model.addAttribute("titulo", "Editar producto");
        return "productos/editarProductoView";
    }

    @PostMapping("/editar/submit")
    public String resultEditarProducto(Producto producto) {
        productoService.remplazar(producto);
        return "redirect:/productos";
    }
}
