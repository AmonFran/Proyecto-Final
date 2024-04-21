package com.example.Proyecto;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.example.Proyecto.domain.Categoria;
import com.example.Proyecto.domain.Pedido;
import com.example.Proyecto.domain.Producto;
import com.example.Proyecto.domain.Rol;
import com.example.Proyecto.domain.Usuario;
import com.example.Proyecto.services.CategoriaService;
import com.example.Proyecto.services.DetallesPedidoService;
import com.example.Proyecto.services.PedidoService;
import com.example.Proyecto.services.ProductoService;
import com.example.Proyecto.services.UsuarioService;

@SpringBootApplication
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@Bean
	CommandLineRunner initData(ProductoService productoService, CategoriaService categoriaService,
			UsuarioService usuarioService, PedidoService pedidoService, DetallesPedidoService detallesPedidoService) {
		return args -> {
			Categoria mochilas = categoriaService.añadir(new Categoria(0L, "Mochilas"));
			Categoria bolsos = categoriaService.añadir(new Categoria(0L, "Bolsos"));
			Categoria bandoleras = categoriaService.añadir(new Categoria(0L, "Bandoleras"));
			Categoria cortinas = categoriaService.añadir(new Categoria(0L, "Cortinas"));
			productoService.añadir(new Producto(0L, "Mochila verde", 24D, 1L, "../images/viejas/mochilaVerde.jpg", mochilas));
			productoService.añadir(new Producto(0L, "Bolso rojo", 50D, 5L, "../images/viejas/bolsoRojo.jpg", bolsos));
			productoService.añadir(new Producto(0L, "Bandolera azul", 12D, 3L, "../images/viejas/sacoAzul.jpg", bandoleras));
			productoService
					.añadir(new Producto(0L, "Cortina estampada", 100D, 9L, "../images/viejas/cortinaEstampada.jpg", cortinas));
			Usuario user1 = usuarioService
					.añadir(new Usuario(null, "SirMurloc1", "Sir Finley", "Mrrgglton", "Mrrrgll ", "Uldum", Rol.ADMIN));
			usuarioService.añadir(new Usuario(null, "fuegoLover", "Ragnaros", "Fire", "cata", "FireLand", Rol.USER));
			usuarioService
					.añadir(new Usuario(null, "elune02", "Tyrande", "Susurravientos", "fgfdgfdg", "Darnassus",
							Rol.MANAGER));
			pedidoService.añadir(new Pedido(0L, user1));
			usuarioService.añadir(new Usuario(null, "Admin1", "Admin1", "Admin1", "1234", "Admin1", Rol.ADMIN));
			usuarioService.añadir(new Usuario(null, "User1", "User1", "User1", "1234", "User1", Rol.USER));
			usuarioService.añadir(new Usuario(null, "Manager1", "Manager1", "Manager1", "1234", "Manager1", Rol.MANAGER));
		};
	}
}
