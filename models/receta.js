const { Schema, model } = require('mongoose');

const RecetaSchema = new Schema({
  creador: String,   // Nombre o correo del creador
  nombre: String,    // Nombre de la receta
  descripcion: String, // Descripción de la receta
  ingredientes: [String], // Lista de ingredientes en texto
  fechaCreacion: { type: Date, default: Date.now },
  votos: [],         // Usuarios que votaron
  calificacion: { type: Number, default: 0 } // Total de votos o promedio
});

module.exports = model('Receta', RecetaSchema);
