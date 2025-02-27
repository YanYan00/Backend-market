
CREATE DATABASE tienda;

\c tienda;

CREATE TABLE Usuarios (
    idUsuario SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    fechaCrea DATE DEFAULT CURRENT_DATE,
    correo VARCHAR(255) UNIQUE NOT NULL,
    telefono VARCHAR(50),
    direccion TEXT;
);


CREATE TABLE Categorias (
    idCategoria SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL UNIQUE
);


CREATE TABLE Productos (
    idProducto SERIAL PRIMARY KEY,
    sku VARCHAR(255) UNIQUE NOT NULL,
    descripcion VARCHAR(255),
    precio INTEGER NOT NULL CHECK (precio >= 0),
    stock INTEGER NOT NULL CHECK (stock >= 0),
    nombre VARCHAR(255) NOT NULL,
    fechaCrea DATE DEFAULT CURRENT_DATE,
    idCategoria INTEGER NOT NULL,
    FOREIGN KEY (idCategoria) REFERENCES Categorias(idCategoria) ON DELETE CASCADE
);

CREATE TABLE Publicaciones (
   idPublicacion SERIAL PRIMARY KEY,
   titulo VARCHAR(255) NOT NULL,
   descripcion VARCHAR(255),
   precio INTEGER NOT NULL CHECK (precio >= 0),
   fechaCrea DATE DEFAULT CURRENT_DATE,
   idUsuario INTEGER NOT NULL,
   idCategoria INTEGER NOT NULL, 
   idProducto INTEGER UNIQUE,
   FOREIGN KEY (idUsuario) REFERENCES Usuarios(idUsuario) ON DELETE CASCADE,
   FOREIGN KEY (idCategoria) REFERENCES Categorias(idCategoria) ON DELETE CASCADE,
   FOREIGN KEY (idProducto) REFERENCES Productos(idProducto) ON DELETE SET NULL
);
CREATE TABLE Carrito (
    idCarrito SERIAL PRIMARY KEY,
    idUsuario INTEGER NOT NULL,
    idProducto INTEGER NOT NULL,
    cantidad INTEGER NOT NULL DEFAULT 1,
    fechaAgregado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (idUsuario) REFERENCES Usuarios(idUsuario) ON DELETE CASCADE,
    FOREIGN KEY (idProducto) REFERENCES Productos(idProducto) ON DELETE CASCADE
);

CREATE TABLE Pedidos (
    idPedido SERIAL PRIMARY KEY,
    idUsuario INTEGER,
    nombreComprador VARCHAR(255) NOT NULL,
    emailComprador VARCHAR(255) NOT NULL,
    telefonoComprador VARCHAR(50),
    direccionComprador TEXT NOT NULL,
    total NUMERIC(10,2) NOT NULL,
    estado VARCHAR(50) DEFAULT 'Confirmado',
    fechaPedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE DetallesPedido (
    idDetalle SERIAL PRIMARY KEY,
    idPedido INTEGER NOT NULL,
    idProducto INTEGER NOT NULL,
    idVendedor INTEGER NOT NULL,
    cantidad INTEGER NOT NULL,
    precio NUMERIC(10,2) NOT NULL,
    estado VARCHAR(50) DEFAULT 'Confirmado',
    FOREIGN KEY (idPedido) REFERENCES Pedidos(idPedido) ON DELETE CASCADE,
    FOREIGN KEY (idProducto) REFERENCES Productos(idProducto) ON DELETE CASCADE,
    FOREIGN KEY (idVendedor) REFERENCES Usuarios(idUsuario) ON DELETE CASCADE
);
