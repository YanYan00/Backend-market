const pool = require('../bd/server.js');

const obtenerPedidosDB = async(id)=>{
    try {
        const consulta = 'SELECT d.iddetalle,d.idPedido,d.idProducto,d.cantidad,d.estado,d.precio, p.nombre,p.urlImagen,pe.nombreComprador,pe.direccionComprador FROM detallesPedido d JOIN Pedidos pe ON d.idPedido = pe.idPedido LEFT JOIN Productos p ON d.idProducto = p.idProducto WHERE d.idVendedor=$1';
        const values = [id];
        const result = await pool.query(consulta,values);
        return result.rows;
    } catch (error) {
        console.error('Error al obtener pedidos:',error);
        throw error;
    }
}
const obtenerComprasDB = async(id)=>{
    try {
        const consulta = 'SELECT d.idPedido,d.idProducto,d.cantidad,d.estado,d.precio,p.nombre,p.precio,p.urlImagen FROM detallesPedido d JOIN Pedidos pe ON d.idPedido = pe.idPedido LEFT JOIN Productos p ON d.idProducto = p.idProducto WHERE pe.idUsuario = $1';
        const values = [id];
        const result = await pool.query(consulta,values);
        return result.rows;
    } catch (error) {
        console.error('Error al obtener compras:',error);
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