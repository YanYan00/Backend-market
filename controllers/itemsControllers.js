const { obtenerProductosDB, obtenerPerfilDB, obtenerCategoriasDB , obtenerPublicacionesDB,agregarPublicacionDB,agregarProductoDB} = require("../models/itemsModels");

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
const obtenerPublicaciones = async (req, res) => {
    try {
        const { id } = req.params;
        const publicaciones = await obtenerPublicacionesDB(id);
        res.status(200).json(publicaciones);
    } catch (error) {
        res.status(500).json({ 
            error: error.message,
            details: error.stack 
        });
    }
}
const agregarProducto = async (req,res) =>{
    try {
        const productoData = req.body;
        const producto = await agregarProductoDB(productoData);
        res.status(201).json(producto);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}
const agregarPublicacion = async(req,res) =>{
    try {
        const publicaconData = req.body; 
        const publicacion = await agregarPublicacionDB(publicaconData);
        res.status(201).json(publicacion);
    } catch (error) {
        console.error("Error:",error);
        res.status(500).json({error: error.message});
    }
}
module.exports = {
    obtenerProductos,
    obtenerPerfil,
    obtenerCategorias,
    obtenerPublicaciones,
    agregarProducto,
    agregarPublicacion
};