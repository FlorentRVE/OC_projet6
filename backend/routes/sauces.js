const express = require('express');
const router = express.Router();

// Appel des middlewares
const auth = require('../middleware/auth');
const multer = require('../middleware/multer')

// Lier les actions à effectuer à la route appelée
const saucesCtrl = require('../controllers/sauces');

router.get('/', auth, saucesCtrl.arraySauces)
router.post('/', auth, multer, saucesCtrl.createSauces)

router.get('/:id', auth, saucesCtrl.singleSauces)
router.put('/:id', auth, multer, saucesCtrl.modifySauces)
router.delete('/:id', auth, saucesCtrl.deleteSauces)

router.post('/:id/like', auth, saucesCtrl.likeSauces)


module.exports = router;