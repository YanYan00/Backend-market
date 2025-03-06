const { obtenerPedidosDB, obtenerComprasDB, confirmarEnvioDB } = require("../models/ordersModels");

const obtenerPedidos = async(req,res) => {
    try {
        const {id} = req.params;
        console.log('ID recibido para pedidos:', id);
        const result = await obtenerPedidosDB(id);
        res.json(result);
    } catch (error) {
        console.error('Error en obtenerPedidos:', error);
        res.status(500).json({
            error: error.message, 
            data: []
        });
    }
}

const obtenerCompras = async(req,res) => {
    try {
        const {id} = req.params;
        console.log('ID recibido para compras:', id);
        const result = await obtenerComprasDB(id);
        res.json(result);
    } catch (error) {
        console.error('Error en obtenerCompras:', error);
        res.status(500).json({
            error: error.message, 
            data: []
        });
    }
}
const confirmarEnvio = async(req,res) =>{
    try {
        const {id} = req.params;
        const {dato} = req.body;
        const result = await confirmarEnvioDB(id,dato);
        res.json(result);
    } catch (error) {
        console.error('Error:',error);
        res.status(500).json({error: error.message});
    }
}
module.exports ={
    obtenerPedidos,
    obtenerCompras,
    confirmarEnvio
}