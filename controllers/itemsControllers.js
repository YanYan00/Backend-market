const { obtenerProductosDB, obtenerPerfilDB, obtenerCategoriasDB } = require("../models/itemsModels");

const obtenerProductos = async (req, res) => {
    try {
        const posts = await obtenerProductosDB();
        res.json(posts);
    } catch (error) {
        console.error('Error:', error);
    }

};
const obtenerCategorias = async(req,res) =>{
    try {
        const categorias = await obtenerCategoriasDB();
        res.json(categorias);
    } catch (error) {
        console.error("Error:",error)
    }
}
const obtenerPerfil = async (req,res) => {
    try {
        const {id} = req.params;
        const perfil = await obtenerPerfilDB(id);
        res.json(perfil);
    } catch (error) {
        console.error("Error:",error)
    }
}
module.exports = {
    obtenerProductos,
    obtenerPerfil,
    obtenerCategorias
};