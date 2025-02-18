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
        console.log('Ejecutando consulta con id:', id);
        
        const { rows } = await pool.query(consulta, [id]);
        console.log('Resultado:', rows);
        
        return rows;
    } catch (error) {
        console.error('Error en BD:', error);
        throw error;
    }
}
module.exports ={
    obtenerProductosDB,
    obtenerPerfilDB,
    obtenerCategoriasDB,
    obtenerPublicacionesDB
};