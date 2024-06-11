DROP TABLE `imagen`,`detallepedido`,`pedido`,`producto`, `categoria`, `usuario`;

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

ALTER TABLE `Producto` ADD FOREIGN KEY (`idCategoria`) REFERENCES `Categoria` (`id`);

ALTER TABLE `Imagen` ADD FOREIGN KEY (`idProducto`) REFERENCES `Producto` (`id`);

ALTER TABLE `Pedido` ADD FOREIGN KEY (`idUsuario`) REFERENCES `Usuario` (`id`);

ALTER TABLE `DetallePedido` ADD FOREIGN KEY (`idPedido`) REFERENCES `Pedido` (`id`);

ALTER TABLE `DetallePedido` ADD FOREIGN KEY (`idProducto`) REFERENCES `Producto` (`id`);


INSERT INTO `categoria`
VALUES
('1','Mochilas'),
('2','Bolsos'),
('3','Bandoleras'),
('4','Cortinas');

INSERT INTO `producto` 
VALUES 
('1', 'Mochila verde', '24', 'Verde, Plastico', NULL, '1'),
('2', 'Bolso rojo', '50', 'Rojo, Tela', NULL, '2'),
('3', 'Bandolera azul', '12', 'Azul, Plastico', NULL, '3'),
('4', 'Cortina estampada', '100', 'Estampada, Tela', NULL, '4'),
('5', 'Mochila azul', '50', 'Azul, Plastico', NULL, '1'),
('6', 'Mochila cactus', '50', 'Cactus, Algodon', NULL, '1'),
('7', 'Mochila dragones', '50', 'Dragon, Tela', NULL, '1'),
('8', 'Mochila flores', '50', 'Flores, Plastico', NULL, '1'),
('9', 'Mochila negra', '50', 'Negra, Plastico', NULL, '1'),
('10', 'Mochila Stitch', '50', 'Rosa, Dibujo, Stitch', NULL, '1');

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
('10', '10', 'Mochila Stitch frontal', 'http://localhost/api/assets/images/productos/mochilaStitch.png');

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