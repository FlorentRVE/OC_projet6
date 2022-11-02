const mongoose = require('mongoose');

// Créer un schéma de donnée pour les Users
const UserSchema = mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true }
});

// Transforme le schéma en modèle utilisable
module.exports = mongoose.model('User', UserSchema);