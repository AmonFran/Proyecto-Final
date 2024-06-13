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
('2', 'Bolso rojo', '50', 'Rojo, Tela', 'Bolso de color rojo hecha con tela de lino.', '2'),
('3', 'Bandolera azul', '12', 'Azul, Plastico', 'Bandolera de color azul hecha con tela plastica, consta de un unico bolsillo. Que se cierra mediante unos cordeles que tambien se usan para transportarlo a la espalda.', '3'),
('4', 'Cortina estampada', '100', 'Estampada, Tela', 'Cortina estampada con diseño a rayas hecha con tela de lino.', '4'),
('5', 'Mochila azul', '50', 'Azul, Plastico', 'Mochila de color azul hecha con tela plastica, consta de 4 bolsillos, uno pequeño en la parte frontal, otro mas grande en la parte posterior y dos pequeñitos a los lados.', '1'),
('6', 'Mochila cactus', '50', 'Cactus, Algodon', 'Mochila con estampado de cactus en flor hecha de tela de algodon. Consta de cinco bolsillos, tres en la parte frontal, de diferentes tamaños; y dos bolsillos pequeños en los laterales.', '1'),
('7', 'Mochila dragones', '50', 'Dragon, Tela', 'Mochila con estampado de dragones de color fosforito, hecha de tela de lino. Consta de cinco bolsillos, tres en la parte frontal, de diferentes tamaños; y dos bolsillos pequeños en los laterales.', '1'),
('8', 'Mochila flores', '50', 'Flores, Plastico', 'Mochila con estampado de flores blancas y amarillas en un fondo azul, hecha de tela plastica. Consta de 4 bolsillos, uno grande y otro pequeño en la parte frontal; asi como dos bolsilo pequeñitos en los laterales.', '1'),
('9', 'Mochila negra', '50', 'Negra, Plastico', 'Mochila de color negro mate, hecha de tela plastica. Consta de cinco bolsillos, tres en la parte frontal, de diferentes tamaños.', '1'),
('10', 'Mochila Stitch', '50', 'Rosa, Dibujo, Stitch', 'Mochila de color rosado y negro, con un dibujo de Stitch en el frente. Consta de tres bolsillos en la parte frontal.', '1'),
('11', 'Bolsa de algodón', '73', 'Algodon, Claro', 'Bolsa 100% de algodón de color claro, perfecta para pequeñas compras.', '2'),
('12', 'Mochila tactica', '125', 'Negro, Plastico', 'Mochila tactica de color negro.', '1');

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
('13', '12', 'Mochila tactica frontal', 'http://localhost/api/assets/images/productos/mochilaTactica.png');

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
