const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Créer un schéma de donnée pour les Users
const UserSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

UserSchema.plugin(uniqueValidator)

// Transforme le schéma en modèle utilisable
module.exports = mongoose.model('User', UserSchema);