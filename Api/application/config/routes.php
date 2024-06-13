<?php
defined('BASEPATH') or exit('No direct script access allowed');

$route['default_controller'] = 'welcome';
$route['404_override'] = '';
$route['translate_uri_dashes'] = TRUE;

$route['prueba-get'] = 'Test/prueba';
$route['prueba-post'] = 'Test/prueba';

// Api
$route['todo-get'] = 'ApiProducto/todo';

// Api producto
$route['producto-get'] = 'ApiProducto/producto';
$route['producto-post'] = 'ApiProducto/producto';
$route['producto-put'] = 'ApiProducto/producto';
$route['producto-delete'] = 'ApiProducto/producto';

// Api categoria
$route['categoria-post'] = 'ApiCategoria/categoria';
$route['categoria-put'] = 'ApiCategoria/categoria';
$route['categoria-delete'] = 'ApiCategoria/categoria';

// Api usuario
$route['usuario-post'] = 'ApiUsuario/usuario';
$route['usuario-put'] = 'ApiUsuario/usuario';
$route['usuario-delete'] = 'ApiUsuario/usuario';

// Api imagen
$route['imagen-post'] = 'ApiImagen/imagen';
$route['imagen-put'] = 'ApiImagen/imagen';
$route['imagen-delete'] = 'ApiImagen/imagen';

// Api pedido
$route['pedido-post'] = 'ApiPedido/pedido';
$route['pedido-put'] = 'ApiPedido/pedido';
$route['pedido-delete'] = 'ApiPedido/pedido';

// Api detalle pedido
$route['detalle-post'] = 'ApiDetallePedido/detalle';
$route['detalle-put'] = 'ApiDetallePedido/detalle';
$route['detalle-delete'] = 'ApiDetallePedido/detalle';

// Api comentario
$route['comentario-post'] = 'ApiComentario/comentario';
$route['comentario-put'] = 'ApiComentario/comentario';
$route['comentario-delete'] = 'ApiComentario/comentario';

// Subir imagenes
$route['archivo-post'] = 'ApiArchivo/archivo';
