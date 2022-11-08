const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/users');

// Lier les actions à effectuer à la route appelée
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;