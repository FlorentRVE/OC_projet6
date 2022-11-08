// Importation du package jswebtoken
const jwt = require('jsonwebtoken');

// On utilise le model sauces
const User = require('../models/sauces');

// Actions à effectuer selon la route appelée
exports.arraySauces =(req, res, next) => {

    console.log(req.auth)
}