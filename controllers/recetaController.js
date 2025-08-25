const Receta = require('../models/receta');
const Usuario = require('../models/Usuario');

exports.getRecetas = async (req, res) => {
  try {
    const recetas = await Receta.find();
     const recetasConUsuario = await Promise.all(
    recetas.map(async (c) => {
    try {
      // Buscar al usuario por ID (c.creador) y seleccionar solo nombre y correo
      const usuario = await Usuario.findById(c.creador).select('nombre correo');
      return {
        ...c.toObject(),        // Convertir el documento de Mongoose a objeto plano JS
        creador: usuario || null // Reemplazar el campo 'creador' con los datos del usuario (o null si no se encontró)
      };
    } catch (error) {
      // En caso de error al buscar usuario, devolvemos la camiseta con 'creador' null
      return {
        ...c.toObject(),
        creador: null
      };
    }
  })
);
console.log(recetasConUsuario);
    res.json(recetasConUsuario);
    // Enriquecer cada receta con datos del usuario creador:
  } catch (error) {
    res.status(500).json({ error: 'Error del servidor' });
  }
};

exports.getRecetasorderbycalificacion = async (req, res) => {
  try {
    const recetas = await Receta.find().sort({ calificacion: -1 });
     const recetasConUsuario = await Promise.all(
    recetas.map(async (c) => {
    try {
      // Buscar al usuario por ID (c.creador) y seleccionar solo nombre y correo
      const usuario = await Usuario.findById(c.creador).select('nombre correo');
      return {
        ...c.toObject(),        // Convertir el documento de Mongoose a objeto plano JS
        creador: usuario || null // Reemplazar el campo 'creador' con los datos del usuario (o null si no se encontró)
      };
    } catch (error) {
      // En caso de error al buscar usuario, devolvemos la camiseta con 'creador' null
      return {
        ...c.toObject(),
        creador: null
      };
    }
  })
);
console.log(recetasConUsuario);
    res.json(recetasConUsuario);
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
    nuevaReceta.creador = req.usuarioId;
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

// Ejemplo de implementación en Node/Express para recetas
exports.calificarReceta = async (req, res) => {
  const id = req.params.id;
  let { calificacion } = req.body; // calificacion será 1 o -1 según voto

  try {
    calificacion = Number(calificacion); // convertir a número
    if (isNaN(calificacion) || ![1, -1].includes(calificacion)) {
      return res.status(400).json({ error: 'Valor de calificación inválido' });
    }

    const receta = await Receta.findById(id);
    if (!receta) {
      return res.status(404).json({ error: 'Receta no encontrada' });
    }

    if (typeof receta.calificacion !== 'number') {
      receta.calificacion = 0;
    }
console.log(receta)
    receta.calificacion += calificacion;
    await receta.save();

    return res.json(receta);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error de servidor' });
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
