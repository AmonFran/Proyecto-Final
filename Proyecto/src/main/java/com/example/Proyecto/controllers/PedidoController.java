package com.example.Proyecto.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.Proyecto.domain.Pedido;
import com.example.Proyecto.services.PedidoService;
import com.example.Proyecto.services.UsuarioService;

@Controller
@RequestMapping("/pedidos")
public class PedidoController {
    @Autowired
    PedidoService pedidoService;
    @Autowired
    UsuarioService usuarioService;

    @GetMapping("")
    public String showPedidos(Model model) {
        model.addAttribute("listaPedidos", pedidoService.obtenerTodos());
        model.addAttribute("titulo", "Pedidos");
        return "pedidos/pedidosView";
    }

    @GetMapping("/nuevo")
    public String nuevoProducto(Model model) {
        model.addAttribute("nuevoPedido", new Pedido());
        model.addAttribute("listaUsuarios", usuarioService.obtenerTodos());
        model.addAttribute("titulo", "Añadir pedido");
        return "pedidos/nuevoPedidoView";
    }

    @PostMapping("/nuevo/submit")
    public String añadirProducto(Pedido pedido) {
        pedidoService.añadir(pedido);
        return "redirect:/pedidos";
    }
}
