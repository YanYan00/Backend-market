const pool =require("../bd/server.js")

const obtenerProductosDB = async () => {
    const {rows} = await pool.query('SELECT  p.idProducto, p.sku, p.descripcion, p.precio, p.stock, p.nombre,  p.fechaCrea, c.nombre AS categoria FROM  Productos p JOIN Categorias c ON p.idCategoria = c.idCategoria' );
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
const obtenerPublicacionesDB = async (id) => {
    try {
        const consulta = "SELECT * FROM Publicaciones WHERE idUsuario = $1";
        const { rows } = await pool.query(consulta, [id]);
        return rows;
    } catch (error) {
        throw error;
    }
}
const agregarProductoDB =async (data) => {
    const {descripcion,precio,stock,nombre,idCategoria} = data;
    const consulta = "INSERT INTO Productos (descripcion,precio,stock,nombre,idCategoria) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *"
    const values = [descripcion,precio,stock,nombre,idCategoria];
    const result = await pool.query(consulta,values);
    return result.rows[0];
}
const agregarPublicacionDB = async (data) => {
    try{
        const {titulo,descripcion,precio,idUsuario,idCategoria,idProducto} = data;
        const consulta = "INSERT INTO Publicaciones (titulo,descripcion,precio,idUsuario,idCategoria,idProducto) VALUES (DEFAULT, $1,$2,$3,$4,$5,$6) RETURNING *"
        const values = [titulo,descripcion,precio,idUsuario,idCategoria,idProducto];   
        const result = await pool.query(consulta,values);
        return result.rows[0];
    }
    catch(error){
        console.error("Error en bd:",error);
        throw error;
    }
}
module.exports ={
    obtenerProductosDB,
    obtenerPerfilDB,
    obtenerCategoriasDB,
    obtenerPublicacionesDB,
    agregarPublicacionDB,
    agregarProductoDB
};