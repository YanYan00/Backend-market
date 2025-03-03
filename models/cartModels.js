const pool = require('../bd/server.js');

const obtenerCarroDB = async(idUsuario)=>{
    try {
        const consulta = 'SELECT idProducto,cantidad FROM Carrito WHERE idUsuario=$1';
        const values =[idUsuario];
        const result = await pool.query(consulta,values);
        return result.rows;
    } catch (error) {
        console.error('Error al obtener carrito:',error);
        throw error;
    }
}
const agregarCarroDB = async(idUsuario,idProducto,cantidad =1) =>{
    try {
        const verificarConsulta = 'SELECT * FROM Carrito WHERE idUsuario = $1 AND idProducto = $2'
        const {rows} = await pool.query(verificarConsulta,[idUsuario,idProducto]);
        if(rows.length > 0){
            const nuevaCantidad = rows[0].cantidad + cantidad;
            const actualizarConsulta = 'UPDATE Carrito SET cantidad=$1 WHERE idUsuario=$2 AND idProducto = $3 RETURNING *';
            const result = await pool.query(actualizarConsulta,[nuevaCantidad,idUsuario,idProducto]);
            return result.rows[0];
        }
        else{
            const agregarConsulta = 'INSERT INTO Carrito (idUsuario,idProducto,cantidad) VALUES ($1,$2,$3) RETURNING *'
            const result = await pool.query(agregarConsulta,[idUsuario,idProducto,cantidad]);
            return result.rows[0];
        }
    } catch (error) {
        console.error('Error en BD:',error);
        throw error;
    }
}
const eliminarCarroDB = async(idUsuario,idProducto)=>{
    try {
        const verificarConsulta = 'SELECT * FROM Carrito WHERE idUsuario=$1 AND idProducto = $2';
        const verificarResult = await pool.query(verificarConsulta,[idUsuario,idProducto]);
        if(verificarResult.rows.length === 0){
            throw new Error('Producto no encontrado en el carrito');
        }
        const item = verificarResult.rows[0];
        if(item.cantidad > 1){
            const eliminarConsulta = 'UPDATE Carrito SET cantidad = cantidad - 1 WHERE idUsuario=$1 AND idProducto = $2 RETURNING *';
            const result = await pool.query(eliminarConsulta,[idUsuario,idProducto]);
            return result.rows[0];
        }
        else{
            const eliminarConsulta = 'DELETE FROM Carrito WHERE idUsuario=$1 AND idProducto=$2 RETURNING *';
            const result = await pool.query(eliminarConsulta,[idUsuario,idProducto]);
            return result.rows[0];
        } 
    } catch (error) {
        console.error('Error al eliminar del carrito:', error);
        throw error;
    }
    
}
const vaciarCarroDB = async(idUsuario) =>{
    try {
        const consulta = 'DELETE FROM Carrito WHERE idUsuario=$1 RETURNING *';
        const result = await pool.query(consulta,[idUsuario]);
        return result.rows
    } catch (error) {
        console.error('Error al vaciar el carrito:',error);
    }
}
const agregarPedidoDB = async(data) =>{
    try {
        let consulta;
        let values;
        if(data.idComprador){
            consulta = 'INSERT INTO Pedidos (idusuario,nombreComprador,emailComprador,telefonoComprador,direccionComprador,total) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *';
            values = [data.idComprador,data.userInfo.nombre,data.userInfo.email,data.userInfo.telefono,data.userInfo.direccion,data.total];
        }
        else{
            if (!data.comprador) {
                throw new Error("Datos de comprador no proporcionados");
            }
            consulta = 'INSERT INTO Pedidos (nombreComprador,emailComprador,telefonoComprador,direccionComprador,total) VALUES ($1,$2,$3,$4,$5) RETURNING *';
            values = [data.comprador.nombre,data.comprador.email,data.comprador.telefono,data.comprador.direccion,data.total];
            
        } 
        const result = await pool.query(consulta, values);
        const idPedido = result.rows[0].idpedido;
        for(const item of data.items){
            let idVendedor = item.idusuario;
            await pool.query("INSERT INTO DetallesPedido (idPedido,idProducto,idVendedor,cantidad,precio,estado) VALUES ($1,$2,$3,$4,$5,$6)RETURNING *",
            [idPedido,item.idproducto,idVendedor,item.cantidad,item.precio,"Confirmado"])
        }
        return {idPedido,orden:`ORD-${idPedido}`,mensaje:"Pedido creado exitosamente"
        }
    } catch (error) {
        console.error('Error al crear pedido en BD:', error);
        throw error;
    }
    
}
module.exports ={
    obtenerCarroDB,
    agregarCarroDB,
    eliminarCarroDB,
    vaciarCarroDB,
    agregarPedidoDB
}