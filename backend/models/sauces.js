const mongoose = require('mongoose');

// Créer un schéma de donnée pour les sauces
const SauceSchema = mongoose.Schema({
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number, required: true },
  dislikes: { type: Number, required: true },
  usersLiked: { type: String, required: true },
  usersDisliked: { type: String, required: true }
});

// Transforme le schéma en modèle utilisable
module.exports = mongoose.model('Sauce', SauceSchema);