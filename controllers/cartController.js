const { agregarCarroDB, agregarCarroExistenteDB } = require("../models/cartModels");

const agregarCarro = async (req,res) =>{
    try {
        const productData = req.body;
        const result = await agregarCarroDB(productData);
        res.status(201).json(result);
    } catch (error) {
        console.error('Error:',error);
        res.status(500).json({error: error.message});
    }
}
const agregarCarroExistente = async (req,res) =>{
    try {
        const {id} = req.params;
        const productData = req.body;
        const result = await agregarCarroExistenteDB(id,productData);
        res.status(201).json(result);
    } catch (error) {
        console.error('Error:',error);
        res.status(500).json({error: error.message});
    }
}
module.exports ={
    agregarCarro,
    agregarCarroExistente
}