const pool = require('../bd/server.js');

const agregarCarroDB = async(producto) =>{
    try {
        const {idUsuario,idProducto,cantidad} = producto;
        const consulta = 'INSERT INTO Carrito (idUsuario,idProducto,cantidad) VALUES ($1,$2,$3) RETURNING *'
        const values = [idUsuario,idProducto,cantidad];
        const result = await pool.query(consulta,values);
        return result.rows[0];
    } catch (error) {
        console.error('Error en BD:',error);
        throw error;
    }
}
const agregarCarroExistenteDB = async(id,producto)=>{
    try {
        const {cantidad} = producto;
        const consulta = 'UPDATE Carrito SET cantidad=$1 WHERE idCarrito=$2 RETURNING *'
        const values = [cantidad,id];
        await pool.query(consulta,values);
    } catch (error) {
        console.error('Error al agregar al carro',error);
        throw error;
    }
}
module.exports ={
    agregarCarroDB,
    agregarCarroExistenteDB
}