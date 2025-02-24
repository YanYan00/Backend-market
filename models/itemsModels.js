const pool =require("../bd/server.js");

const obtenerProductosDB = async () => {
    const {rows} = await pool.query('SELECT  p.idProducto, p.descripcion, p.precio, p.stock, p.nombre,  p.fechaCrea, c.nombre AS categoria FROM  Productos p JOIN Categorias c ON p.idCategoria = c.idCategoria' );
    return rows;
}
const obtenerCategoriasDB = async () =>{
    const {rows} = await pool.query('SELECT * FROM Categorias');
    return rows;
}
const obtenerPerfilDB = async (id) => {
    const consulta = "SELECT nombre, correo FROM Usuarios WHERE idUsuario = $1"
    const { rows, rowCount } = await pool.query(consulta, [id]);
    return rows[0];
}
const obtenerProductoDB = async(id) =>{
    try {
        const consulta = "SELECT * FROM Productos WHERE idProducto = $1";
        const {rows} = await pool.query(consulta,[id])
        return rows[0];
    } catch (error) {
        throw error;
    }
}
const obtenerPublicacionesDB = async (id) => {
    try {
        const consulta = "SELECT * FROM Publicaciones WHERE idUsuario = $1";
        const { rows } = await pool.query(consulta, [id]);
        return rows;
    } catch (error) {
        throw error;
    }
}
const agregarProductoDB = async (data) => {
    try {
        const { nombre, descripcion, precio, stock, idCategoria } = data;
        const consulta = 'INSERT INTO Productos (nombre, descripcion, precio, stock, idCategoria) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const values = [nombre, descripcion, precio, stock, idCategoria];
        const result = await pool.query(consulta, values);
        return result.rows[0];
    } catch (error) {
        console.error('Error en BD:', error);
        throw error;
    }
};
const agregarPublicacionDB = async (data) => {
    try{
        const {titulo,descripcion,precio,idUsuario,idCategoria,idProducto} = data;
        const consulta = "INSERT INTO Publicaciones (titulo,descripcion,precio,idUsuario,idCategoria,idProducto) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *"
        const values = [titulo,descripcion,precio,idUsuario,idCategoria,idProducto];   
        const result = await pool.query(consulta,values);
        return result.rows[0];
    }
    catch(error){
        console.error("Error en bd:",error);
        throw error;
    }
}
const editarProductoDB = async (id,data) =>{
    try {
        const {nombre,descripcion,precio,stock,idCategoria} = data;
        const consulta = "UPDATE Productos SET nombre=$1,descripcion=$2,precio=$3,stock=$4,idCategoria=$5 WHERE idProducto=$6 RETURNING *"
        const values = [nombre,descripcion,precio,stock,idCategoria,id];
        const result = await pool.query(consulta,values);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
}
const editarPublicacionDB = async (id,data) =>{
    try {
        const {titulo,descripcion,precio,idCategoria} = data;
        const consulta = "UPDATE Publicaciones SET titulo=$1,descripcion=$2,precio=$3,idCategoria=$4 WHERE idPublicacion=$5 RETURNING *"
        const values = [titulo,descripcion,precio,idCategoria,id];
        const result = await pool.query(consulta,values);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
}
const eliminarProductoDB = async(id) =>{
    try {
        const consulta = "DELETE FROM Productos WHERE idProducto = $1 RETURNING *";
        const result = await pool.query(consulta,[id]);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
}
const eliminarPublicacionDB = async(id) =>{
    try {
        const consulta = "DELETE FROM Publicaciones WHERE idPublicacion = $1 RETURNING *";
        const result = await pool.query(consulta,[id]);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
}
module.exports ={
    obtenerProductosDB,
    obtenerPerfilDB,
    obtenerCategoriasDB,
    obtenerProductoDB,
    obtenerPublicacionesDB,
    agregarPublicacionDB,
    agregarProductoDB,
    editarProductoDB,
    editarPublicacionDB,
    eliminarProductoDB,
    eliminarPublicacionDB
};