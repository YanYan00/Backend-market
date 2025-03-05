const { obtenerPedidosDB, obtenerComprasDB, confirmarEnvioDB } = require("../models/ordersModels");

const obtenerPedidos = async(req,res) =>{
    try {
        const {id} = req.params;
        const result = await obtenerPedidosDB(id);
        res.json(result);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}
const obtenerCompras = async(req,res) =>{
    try {
        const {id} = req.params;
        const result = await obtenerComprasDB(id);
        res.json(result);
    } catch (error) {
        res.status(500).json({error: error.message});
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