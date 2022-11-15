const express = require('express');
const router = express.Router();

// Lier les actions à effectuer à la route appelée
const userCtrl = require('../controllers/users');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;