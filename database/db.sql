USE crud-node-mysql;

CREATE TABLE articulos(
    id INT(12) NOT NULL,
    nombre VARCHAR(80) NOT NULL,
    img TEXT NOT NULL,
    descripcion VARCHAR(200) NOT NULL
);

ALTER TABLE articulos ADD PRIMARY KEY (id);

ALTER TABLE articulos 
    MODIFY id INT(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;