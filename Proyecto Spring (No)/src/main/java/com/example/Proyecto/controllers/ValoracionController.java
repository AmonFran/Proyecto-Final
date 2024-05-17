package com.example.Proyecto.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.Proyecto.domain.Producto;
import com.example.Proyecto.domain.Usuario;
import com.example.Proyecto.domain.Valoracion;
import com.example.Proyecto.services.ProductoService;
import com.example.Proyecto.services.UsuarioService;
import com.example.Proyecto.services.ValoracionService;

@Controller
@RequestMapping("/valoraciones")
public class ValoracionController {

    @Autowired
    ValoracionService valoracionService;

    @Autowired
    ProductoService productoService;

    @Autowired
    UsuarioService usuarioServiceImpl;

    @GetMapping("/producto/{idProd}")
    public String showValoracionesProductos(@PathVariable Long idProd, Model model) {
        Producto producto = productoService.obtenerPorId(idProd);
        model.addAttribute("titulo", "Valoraciones del Productos");
        model.addAttribute("producto", producto);
        model.addAttribute("listaValoraciones", valoracionService.obtenerPorProducto(producto));
        return "valoraciones/valoracionesProductoView";
    }

    @GetMapping("/usuario/{id}")
    public String showValoracionesUsuario(@PathVariable Long id, Model model) {
        Usuario usuario = usuarioServiceImpl.obtenerPorId(id);
        model.addAttribute("titulo", "Valoraciones del Usuario");
        model.addAttribute("usuario", usuario);
        model.addAttribute("listaValoraciones", valoracionService.obtenerPorUsuario(usuario));
        return "valoraciones/valoracionesUsuarioView";
    }

    @GetMapping("/proBorrar/{idVal}")
    public String borrarValoracionesProductos(@PathVariable Long idVal) {
        Valoracion valoracion = valoracionService.obtenerPorId(idVal);
        if (valoracionService.borrar(valoracion) == true) {
            return "redirect:/valoraciones/usuario/" + valoracion.getProducto().getId();
        } else {
            return "redirect:/publico/?op=5";
        }
    }

    @GetMapping("/userBorrar/{idVal}")
    public String borrarValoracionesUsuario(@PathVariable Long idVal) {
        Valoracion valoracion = valoracionService.obtenerPorId(idVal);
        if (valoracionService.borrar(valoracion) == true) {
            return "redirect:/valoraciones/usuario/" + valoracion.getUsuario().getId();
        } else {
            return "redirect:/publico/?op=5";
        }
    }

    @GetMapping("/new")
    public String nuevaValoracion(Model model) {
        model.addAttribute("titulo", "Nuevo Comentario");
        model.addAttribute("nuevaValoracion", new Valoracion());
        model.addAttribute("listaProductos", productoService.obtenerTodos());
        model.addAttribute("listaUsuarios", usuarioServiceImpl.obtenerTodos());
        return "valoraciones/nuevaValoracionView";
    }

    @PostMapping("/new/submit")
    public String showSubmit(Valoracion valoracion) {
        valoracionService.añadir(valoracion);
        return "redirect:/valoraciones/producto/" + valoracion.getProducto().getId();
    }
}
