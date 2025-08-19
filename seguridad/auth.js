const jwt = require('jsonwebtoken')

function verificarToken(req, res, next){
   
        const token = req.query.token || req.headers['authorization'].split(' ')[1];
        console.log(token)
      
    if (!token) {
        return res.status(401),json({error: 'Token requerido'});
    }

    //const token = authHeader.split(' ')[1]; //Espera formato "Bearer token"
    try {
        const decoded = jwt.verify(token, 'SECRETO_SUPER_SEGUR0');
        req.usuarioId = decoded.id;
        next()

    }catch (err){
        return res.status(403).json({error: 'Token invalido o expirado '});
    }
}
module.exports = { verificarToken };