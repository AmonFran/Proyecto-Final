package com.example.Proyecto.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.Proyecto.domain.DetallesPedido;
import com.example.Proyecto.services.DetallesPedidoService;
import com.example.Proyecto.services.PedidoService;
import com.example.Proyecto.services.ProductoService;

@Controller
@RequestMapping("/detallesPedido")
public class DetallesPedidoController {
    @Autowired
    PedidoService pedidoService;
    @Autowired
    DetallesPedidoService detallesPedidoService;
    @Autowired
    ProductoService productoService;

    @GetMapping("/{id}")
    public String showDetalles(@PathVariable Long id, Model model) {
        List<DetallesPedido> listaDP = detallesPedidoService.obtenerPorPedido(pedidoService.obtenerPorId(id));
        model.addAttribute("titulo", "Detalles Pedido");
        model.addAttribute("pedido", pedidoService.obtenerPorId(id));
        model.addAttribute("listaDP", listaDP);
        return "detallesPedido/detallesPedidoView";
    }

    @GetMapping("/nuevo/{id}")
    public String añadirDP(@PathVariable Long id, Model model) {
        DetallesPedido nuevoDetallePedido = new DetallesPedido();
        nuevoDetallePedido.setPedido(pedidoService.obtenerPorId(id));
        model.addAttribute("titulo", "Nuevo Detalles Pedido");
        model.addAttribute("nuevoDetallePedido", nuevoDetallePedido);
        model.addAttribute("pedidoP", pedidoService.obtenerPorId(id));
        model.addAttribute("listaProductos", productoService.obtenerTodos());
        return "detallesPedido/detallesPedidoNewView";
    }

    @PostMapping("/nuevo/submit")
    public String submitNuevoDP(DetallesPedido detallesPedido) {
        detallesPedidoService.añadir(detallesPedido);
        return "redirect:/detallesPedido/" + detallesPedido.getPedido().getId();
    }

    @GetMapping("/borrar/{id}")
    public String borrarDP(@PathVariable Long id, Model model) {
        DetallesPedido detallePedido = detallesPedidoService.obtenerPorId(id);
        Long auxId = detallePedido.getPedido().getId();
        detallesPedidoService.borrar(id);
        return "redirect:/detallesPedido/" + auxId;
    }
}
