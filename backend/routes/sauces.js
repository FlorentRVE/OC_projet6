const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const saucesCtrl = require('../controllers/sauces');

router.get('/', auth, saucesCtrl.arraySauces)
// router.post('/', auth, saucesCtrl.createSauces)

// router.get('/:id', auth, saucesCtrl.singleSauces)
// router.put('/:id', auth, saucesCtrl.modifySauces)
// router.delete('/:id', auth, saucesCtrl.deleteSauces)

// router.post('/:id/like', auth, saucesCtrl.likeSauces)


module.exports = router;