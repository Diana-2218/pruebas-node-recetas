const Receta = require('../models/receta');


exports.getRecetas = async (req, res) => {
  try {
    const recetas = await Receta.find();
    res.json(recetas);
    // Enriquecer cada receta con datos del usuario creador:
  } catch (error) {
    res.status(500).json({ error: 'Error del servidor' });
  }
};

exports.getRecetaById = async (req, res) => {
  try {
    const receta = await Receta.findById(req.params.id);
    if (!receta) return res.status(404).json({ error: 'Receta no encontrada' });
    res.json(receta);
  } catch (error) {
    res.status(500).json({ error: 'Error del servidor' });
  }
};

exports.createReceta = async (req, res) => {
  try {
    const nuevaReceta = new Receta(req.body);
    const recetaGuardada = await nuevaReceta.save();
    res.status(201).json(recetaGuardada);

  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error al crear la receta' });
  }
};

exports.updateReceta = async (req, res) => {
  try {
    const recetaActualizada = await Receta.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!recetaActualizada) return res.status(404).json({ error: 'Receta no encontrada' });
    res.json(recetaActualizada);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar receta' });
  }
};

exports.deleteReceta = async (req, res) => {
  try {
    const recetaEliminada = await Receta.findByIdAndDelete(req.params.id);
    if (!recetaEliminada) return res.status(404).json({ error: 'Receta no encontrada' });
    res.json({ message: 'Receta eliminada' });
  } catch (error) {
    res.status(500).json({ error: 'Error del servidor' });
  }
};
