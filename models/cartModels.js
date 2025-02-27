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
module.exports ={
    agregarCarroDB
}