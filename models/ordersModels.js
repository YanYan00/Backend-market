const pool = require('../bd/server.js');

const obtenerComprasDB = async(id) => {
    try {
        const consulta = 'SELECT d.idDetalle,d.idPedido, d.idProducto,d.cantidad,d.estado,d.precio,p.nombre,p.urlImagen,pe.nombreComprador,pe.emailComprador,u.nombre AS nombreVendedor FROM DetallesPedido d JOIN Pedidos pe ON d.idPedido = pe.idPedido LEFT JOIN Productos p ON d.idProducto = p.idProducto LEFT JOIN Usuarios u ON d.idVendedor = u.idUsuario WHERE pe.idUsuario = $1';
        const values = [id];
        const result = await pool.query(consulta, values);
        
        console.log('Resultados de compras:', result.rows);
        return result.rows;
    } catch (error) {
        console.error('Error al obtener compras:', error);
        throw error;
    } 
}

const obtenerPedidosDB = async(id) => {
    try {
        const consulta = 'SELECT  d.idDetalle, d.idPedido, d.idProducto,  d.cantidad, d.estado, d.precio, p.nombre, p.urlImagen, pe.nombreComprador, pe.direccionComprador, u.nombre AS nombreVendedor FROM DetallesPedido d JOIN Pedidos pe ON d.idPedido = pe.idPedido LEFT JOIN Productos p ON d.idProducto = p.idProducto LEFT JOIN Usuarios u ON pe.idUsuario = u.idUsuario WHERE d.idVendedor = $1';
        const values = [id];
        const result = await pool.query(consulta, values);
        
        console.log('Resultados de pedidos:', result.rows);
        return result.rows;
    } catch (error) {
        console.error('Error al obtener pedidos:', error);
        throw error;
    } 
}
const confirmarEnvioDB = async(id,dato)=>{
    try {
        const consulta = 'UPDATE detallesPedido SET estado=$1 WHERE idDetalle=$2'
        const values = [dato,id];
        const result = await pool.query(consulta,values);
        return result.rows[0];
    } catch (error) {
        console.error('Error al confirmar el envio:',error);
        throw error;
    }
}
module.exports = {
    obtenerPedidosDB,
    obtenerComprasDB,
    confirmarEnvioDB
}