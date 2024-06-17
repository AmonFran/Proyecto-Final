DROP TABLE `comentario`,`imagen`,`detallepedido`,`pedido`,`producto`, `categoria`, `usuario`;

CREATE TABLE `Producto` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `nombre` varchar(300),
  `precio` int,
  `caracteristicas` varchar(250),
  `descripcion` varchar(500),
  `idCategoria` int
);

CREATE TABLE `Categoria` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `nombre` varchar(50)
);

CREATE TABLE `Imagen` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `idProducto` int,
  `nombre` varchar(250),
  `imagenPath` varchar(500)
);

CREATE TABLE `Usuario` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `email` varchar(100),
  `alias` varchar(50),
  `contrasenha` varchar(25),
  `nombre` varchar(50),
  `apellido` varchar(100),
  `direccion` varchar(150),
  `rol` varchar(15)
);

CREATE TABLE `Pedido`(
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `idUsuario` int,
  `enProceso` boolean,
  `fecha` datetime,
  `estado` varchar(30)
);

CREATE TABLE `DetallePedido`(
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `idPedido` int,
  `idProducto` int
);

CREATE TABLE `Comentario`(
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `cuerpo` varchar(300),
  `idProducto` int,
  `idUsuario` int
);

ALTER TABLE `Producto` ADD FOREIGN KEY (`idCategoria`) REFERENCES `Categoria` (`id`);

ALTER TABLE `Imagen` ADD FOREIGN KEY (`idProducto`) REFERENCES `Producto` (`id`);

ALTER TABLE `Pedido` ADD FOREIGN KEY (`idUsuario`) REFERENCES `Usuario` (`id`);

ALTER TABLE `DetallePedido` ADD FOREIGN KEY (`idPedido`) REFERENCES `Pedido` (`id`);

ALTER TABLE `DetallePedido` ADD FOREIGN KEY (`idProducto`) REFERENCES `Producto` (`id`);

ALTER TABLE `Comentario` ADD FOREIGN KEY (`idProducto`) REFERENCES `Producto` (`id`);

ALTER TABLE `Comentario` ADD FOREIGN KEY (`idUsuario`) REFERENCES `Usuario` (`id`);


INSERT INTO `categoria`
VALUES
('1','Mochilas'),
('2','Bolsos'),
('3','Bandoleras'),
('4','Cortinas');

INSERT INTO `producto` 
VALUES 
('1', 'Mochila verde', '24', 'Verde, Plastico', 'Mochila de color verde hecha con tela plastica, consta de dos bolsillos, uno pequeño en la parte frontal y otro mas grande en la parte posterior.', '1'),
('2', 'Bolso rojo lino', '50', 'Rojo, Tela', 'Bolso de color rojo hecha con tela de lino.', '2'),
('3', 'Bandolera azul', '12', 'Azul, Plastico', 'Bandolera de color azul hecha con tela plastica, consta de un unico bolsillo. Que se cierra mediante unos cordeles que tambien se usan para transportarlo a la espalda.', '3'),
('4', 'Cortina estampada', '100', 'Estampada, Tela', 'Cortina estampada con diseño a rayas hecha con tela de lino.', '4'),
('5', 'Mochila azul', '50', 'Azul, Plastico', 'Mochila de color azul hecha con tela plastica, consta de 4 bolsillos, uno pequeño en la parte frontal, otro mas grande en la parte posterior y dos pequeñitos a los lados.', '1'),
('6', 'Mochila cactus', '50', 'Cactus, Algodon', 'Mochila con estampado de cactus en flor hecha de tela de algodon. Consta de cinco bolsillos, tres en la parte frontal, de diferentes tamaños; y dos bolsillos pequeños en los laterales.', '1'),
('7', 'Mochila dragones', '50', 'Dragon, Tela', 'Mochila con estampado de dragones de color fosforito, hecha de tela de lino. Consta de cinco bolsillos, tres en la parte frontal, de diferentes tamaños; y dos bolsillos pequeños en los laterales.', '1'),
('8', 'Mochila flores', '50', 'Flores, Plastico', 'Mochila con estampado de flores blancas y amarillas en un fondo azul, hecha de tela plastica. Consta de 4 bolsillos, uno grande y otro pequeño en la parte frontal; asi como dos bolsilo pequeñitos en los laterales.', '1'),
('9', 'Mochila negra', '50', 'Negra, Plastico', 'Mochila de color negro mate, hecha de tela plastica. Consta de cinco bolsillos, tres en la parte frontal, de diferentes tamaños.', '1'),
('10', 'Mochila Stitch', '50', 'Rosa, Dibujo, Stitch', 'Mochila de color rosado y negro, con un dibujo de Stitch en el frente. Consta de tres bolsillos en la parte frontal.', '1'),
('11', 'Bolsa de algodón', '73', 'Algodon, Claro', 'Bolsa 100% de algodón de color claro, perfecta para pequeñas compras.', '2'),
('12', 'Mochila tactica', '125', 'Negro, Plastico', 'Mochila tactica de color negro.', '1'),
('13', 'Bolso azul oscuro', '125', 'Azul, Cuero', 'Bolso de cuero de color azul oscuro, perfecto para aquellas personas que buscan algo simple.', '2'),
('14', 'Bolso gris', '125', 'Gris, Cuero', 'Bolso de cuero de color gris, con toques marrones oscuros.', '2'),
('15', 'Bolso magenta', '125', 'Magenta, Tela', 'Bolso de tela de color magenta con asas de cuero marron', '2'),
('16', 'Bolso marron', '125', 'Marron, Cuero', 'Bolso de cuero de color marron, con toques de azules oscuros y mostazas', '2'),
('17', 'Bolso marron floreado', '125', 'Marron, Floreado, Flor, Tela', 'Bolso de tela de color marron con estampado floreado, con asa de metal y cuero', '2'),
('18', 'Bolso beige', '125', 'Beige, Cuero, Polilla', 'Bolso de cuero de color beige y decoracion de polilla.', '2'),
('19', 'Bolso rojo cuero', '125', 'Cuero, Rojo', 'Bolso de cuero de color rojo.', '2'),
('20', 'Bolso blanco', '125', 'Blanco, Cuero', 'Bolso de cuero de color blanco y toques de cuero marron', '2'),
('21', 'Mochila escolar negra', '125', 'Negro, Escolar, Plastico', 'Mochila escolar de tela plastica de color negro, perfecta para llevar los materiales escolares.', '1'),
('22', 'Mochila pistacho', '125', 'Pistacho, Plastico', 'Mochila de tela plastica de color pistacho. Perfecta para viajes de fin de semana por su gran espacio y bolsillos.', '1'),
('23', 'Bandolera azul', '32', 'Azul, Tela', 'Bandolera de tela de color azul.', '3'),
('24', 'Bandolera azul grisaceo', '32', 'Azul, Gris, Plastico', 'Bandolera de tela plastica de color azul grisaceo.', '3'),
('25', 'Bandolera cuero marron', '32', 'Cuero, Marron', 'Bandolera de cuero de color marron.', '3'),
('26', 'Bandolera cuero negro', '32', 'Cuero, Negro', 'Bandolera de cuero de color negro.', '3'),
('27', 'Bandolera gris', '32', 'Gris, Plastico', 'Bandolera de tela plastica de color gris.', '3'),
('28', 'Bandolera negra', '32', 'Negro, Plastico', 'Bandolera de tela plastica de color negro.', '3'),
('29', 'Bandolera vaquera azul', '32', 'Azul, Vaquera', 'Bandolera de tela vaquera de color azul.', '3'),
('30', 'Bandolera verde', '32', 'Verde, Plastico', 'Bandolera de tela plastica de color verde.', '3'),
('31', 'Bandolera verde oscuro', '32', 'Verde, Oscuro, Plastico', 'Bandolera de tela plastica de color verde oscuro.', '3'),
('32', 'Cortina azul', '20', 'Azul, Tela', 'Cortina de tela de lino de color azul.', '4'),
('33', 'Cortina con Rosas', '20', 'Rosas, Flores, Blanco, Rojo, Tela ', 'Cortina de lino de color blanco con detalles en rojo y rosas (flores).', '4'),
('34', 'Cortina con Claveles', '20', 'Claveles, Flores, Blanco, Naranja, Tela', 'Cortina de lino de color blanco con detalles en naranja y diseño de claveles.', '4'),
('35', 'Cortina naranaja', '20', 'Naranaja, Tela', 'Cortina de lino de color naranja.', '4'),
('36', 'Cortina tiras', '20', 'Blanco, Plastico', 'Cortina de tela plastica de color blanco en posicion de tiras.', '4'),
('37', 'Cortina de flores grises', '20', 'Gris, Flores, Tela', 'Cortina de tela de lino de color blanco y gris, con estampado de flores grises', '4'),
('38', 'Cortina azul terciopelo', '20', 'Azul, Terciopelo', 'Cortina de terciopelo de color azul oscuro', '4'),
('39', 'Cortina dorada', '20', 'Dorado, Tela', 'Cortina de tela de lino de color dorado', '4'),
('40', 'Cortina gris', '20', 'Gris, Plastico', 'Cortina plastica de color gris opaco', '4');

INSERT INTO `imagen`
VALUES
('1', '1', 'Mochila verde frontal', 'http://localhost/api/assets/images/productos/mochilaVerde.jpg'),
('2', '2', 'Bolso rojo', 'http://localhost/api/assets/images/productos/bolsoRojo.jpg'),
('3', '3', 'Bandolera azul frontal', 'http://localhost/api/assets/images/productos/sacoAzul.jpg'),
('4', '4', 'Cortina estampada', 'http://localhost/api/assets/images/productos/cortinaEstampada.jpg'),
('5', '5', 'Mochila azul frontal', 'http://localhost/api/assets/images/productos/mochilaAzul.png'),
('6', '6', 'Mochila cactus frontal', 'http://localhost/api/assets/images/productos/mochilaCactus.png'),
('7', '7', 'Mochila dragones frontal', 'http://localhost/api/assets/images/productos/mochilaDragones.png'),
('8', '8', 'Mochila flores frontal', 'http://localhost/api/assets/images/productos/mochilaFlores.png'),
('9', '9', 'Mochila negra frontal', 'http://localhost/api/assets/images/productos/mochilaNegra.png'),
('10', '10', 'Mochila Stitch frontal', 'http://localhost/api/assets/images/productos/mochilaStitch.png'),
('11', '1', 'Mochila verde lateral', 'http://localhost/api/assets/images/productos/mochilaVerde2.png'),
('12', '11', 'Bolsa de algodon frontal', 'http://localhost/api/assets/images/productos/bolsaTelaP.png'),
('13', '12', 'Mochila tactica frontal', 'http://localhost/api/assets/images/productos/mochilaTactica.png'),
('14', '13', 'Bolso azul oscuro frontal', 'http://localhost/api/assets/images/productos/bolsoAzulOscuro.png'),
('15', '14', 'Bolso gris frontal', 'http://localhost/api/assets/images/productos/bolsoGris.png'),
('16', '15', 'Bolso magenta frontal', 'http://localhost/api/assets/images/productos/bolsoMagenta.png'),
('17', '16', 'Bolso marron frontal', 'http://localhost/api/assets/images/productos/bolsoMarron.png'),
('18', '17', 'Bolso marron flores frontal', 'http://localhost/api/assets/images/productos/bolsoMarronFlores.png'),
('19', '18', 'Bolso polilla frontal', 'http://localhost/api/assets/images/productos/bolsoPolilla.png'),
('20', '19', 'Bolso rojo cuero frontal', 'http://localhost/api/assets/images/productos/bolsoRojoCuero.png'),
('21', '20', 'Bolso blanco frontal', 'http://localhost/api/assets/images/productos/bolsoBlanco.png'),
('22', '21', 'Mochila negro frontal', 'http://localhost/api/assets/images/productos/mochilaNegraEscolar.png'),
('23', '22', 'Mochila pistacho frontal', 'http://localhost/api/assets/images/productos/mochilaPistacho.png'),
('24', '23', 'Bandolera azul frontal', 'http://localhost/api/assets/images/productos/bandoleraAzul.png'),
('25', '24', 'Bandolera azul grisaceo frontal', 'http://localhost/api/assets/images/productos/bandoleraAzulGris.png'),
('26', '25', 'Bandolera cuero marron frontal', 'http://localhost/api/assets/images/productos/bandoleraCueroMarron.png'),
('27', '26', 'Bandolera cuero negrofrontal', 'http://localhost/api/assets/images/productos/bandoleraCueroNegro.png'),
('28', '27', 'Bandolera gris frontal', 'http://localhost/api/assets/images/productos/bandoleraGris.png'),
('29', '28', 'Bandolera negra frontal', 'http://localhost/api/assets/images/productos/bandoleraNegra.png'),
('30', '29', 'Bandolera vaquera frontal', 'http://localhost/api/assets/images/productos/bandoleraVaquera.png'),
('31', '30', 'Bandolera verde frontal', 'http://localhost/api/assets/images/productos/bandoleraVerde.png'),
('32', '31', 'Bandolera verde oscuro frontal', 'http://localhost/api/assets/images/productos/bandoleraVerdeOscuro.png'),
('33', '32', 'Cortina azul', 'http://localhost/api/assets/images/productos/cortinaAzul.png'),
('34', '33', 'Cortina rosas', 'http://localhost/api/assets/images/productos/cortinaRosas.png'),
('35', '34', 'Cortina claveles', 'http://localhost/api/assets/images/productos/cortinaFlores.png'),
('36', '35', 'Cortina naranja', 'http://localhost/api/assets/images/productos/cortinaNaranja.png'),
('37', '36', 'Cortina tiras', 'http://localhost/api/assets/images/productos/cortinaTiras.png'),
('38', '37', 'Cortina flores grises', 'http://localhost/api/assets/images/productos/cortinaFloresGris.png'),
('39', '38', 'Cortina azul terciopelo', 'http://localhost/api/assets/images/productos/cortinaAzulTercio.png'),
('40', '39', 'Cortina dorada', 'http://localhost/api/assets/images/productos/cortinaDorada.png'),
('41', '40', 'Cortina gris', 'http://localhost/api/assets/images/productos/cortinaGris.png');

INSERT INTO `usuario`
VALUES
('1','murky@test.com','SirMurloc1','Mrrrgll','Sir Finley','Mrrgglton','Uldum','ADMIN'),
('2','corzocelada@test.com','fuegoLover','cata','Ragnaros','Fire','FireLand','USER'),
('3','malfurion@test.com','elune02','fgfdgfdg','Tyrande','Susurravientos','Darnassus','MANAGER'),
('4','test@test.com','test','test','Test','Test','Calle Test nº4','USER'),
('5','admin@test.com','admin','admin','Admin','Admin','Calle Admin','ADMIN'),
('6','manager@test.com','manager','manager','Manager','Manager','Calle Manager','MANAGER');

INSERT INTO `pedido` (`id`,`idUsuario`,`enProceso`)
VALUES
('1','3',true),
('2','2',true),
('3','4',true);

INSERT INTO `detallePedido`
VALUES
('1','1','1'),
('2','1','2'),
('3','2','3'),
('4','3','5'),
('5','3','4');

INSERT INTO `Comentario`
VALUES
('1','fdghfhfghs sdaafdgdfgsdfgdsfgsdfgfdsg','1','4'),
('2','sdfgsfdgdsfgascrlñmfwhefac asdasasdss','1','4'),
('3','rtg sretywsggwerg wergsfdvb fdgsadssa','5','2'),
('4','dgdfgadfgsfdg sdfg sdfg sdfg vcb sbfg','5','2');
