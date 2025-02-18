const { obtenerProductosDB, obtenerPerfilDB, obtenerCategoriasDB , obtenerPublicacionesDB} = require("../models/itemsModels");

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
const obtenerPublicaciones = async (req,res) =>{
    try {
        const {id} = req.params;
        const publicaciones = await obtenerPublicacionesDB(id);
        res.status(200).json(publicaciones);
    } catch (error) {
        console.error("Error:",error)
        res.status(500).json({error:error.message});
    }
}
module.exports = {
    obtenerProductos,
    obtenerPerfil,
    obtenerCategorias,
    obtenerPublicaciones
};