const jwt = require('jsonwebtoken');
const multer = require('multer');
const verificarCredencialesMiddleware = (req, res, next) => {
    const { correo, password } = req.body;
    if (!correo || !password) {
        return res.status(401).json({ 
            error: "Credenciales incompletas",
            received: req.body 
        });
    }
    next();
}
const storage = multer.memoryStorage();
const upload = multer({storage});
module.exports ={
    verificarCredencialesMiddleware,
    upload
}