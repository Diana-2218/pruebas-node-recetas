const express = require('express');
const router = express.Router();
const recetaController = require('../controllers/recetaController');
const { verificarToken } = require('../seguridad/auth');

router.get('/', verificarToken, recetaController.getRecetas);
router.get('/:id', verificarToken, recetaController.getRecetaById);
router.post('/', verificarToken, recetaController.createReceta);
router.put('/:id', verificarToken, recetaController.updateReceta);
router.delete('/:id', verificarToken, recetaController.deleteReceta);

module.exports = router;

