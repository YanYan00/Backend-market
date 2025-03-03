const { agregarCarroDB, obtenerCarroDB, eliminarCarroDB, vaciarCarroDB,agregarPedidoDB} = require("../models/cartModels");

const obtenerCarro =async(req,res) =>{
    try {
        const {id} = req.params;
        const result = await obtenerCarroDB(id);
        res.json(result);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}
const agregarCarro = async (req,res) =>{
    try {
        const {idUsuario,idProducto,cantidad} = req.body;
        const result = await agregarCarroDB(idUsuario,idProducto,cantidad || 1);
        res.status(201).json(result);
    } catch (error) {
        console.error('Error:',error);
        res.status(500).json({error: error.message});
    }
}
const eliminarCarro = async (req,res) =>{
    try {
        const {idUsuario,idProducto} =req.body;
        const result = await eliminarCarroDB(idUsuario,idProducto);
        res.json(result);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}
const vaciarCarro = async (req,res) =>{
    try {
        const {idUsuario} = req.params;
        const result = await vaciarCarroDB(idUsuario);
        res.json(result); 
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}
const agregarPedido = async(req,res) =>{
    try {
        const data = req.body;
        const result = await agregarPedidoDB(data);
        res.status(201).json(result);    
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}
module.exports ={
    obtenerCarro,
    agregarCarro,
    eliminarCarro,
    vaciarCarro,
    agregarPedido,
}