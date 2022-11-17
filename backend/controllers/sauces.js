// Importation du package jswebtoken
const jwt = require('jsonwebtoken');
const { update } = require('../models/sauces');

// On utilise le model Sauce
const Sauce = require('../models/sauces');

// Actions à effectuer selon la route appelée
exports.createSauces = (req, res, next) => {
  
  const sauceObject = JSON.parse(req.body.sauce);
    
    const sauce = new Sauce({
        userId: sauceObject.userId,
        name: sauceObject.name,
        manufacturer: sauceObject.manufacturer,
        description: sauceObject.description,
        mainPepper: sauceObject.mainPepper,
        heat: sauceObject.heat,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: [],
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` // équivalent de "'http://localhost:3000/uploads/images/sauces/' + req.file.filename"
    });

  sauce.save()
    .then(() => {res.status(201).json({message: 'Sauce crée avec succès !'})})
    .catch((error) => {res.status(400).json({error: error})});
};

exports.singleSauces = (req, res, next) => {

  Sauce.findOne({_id: req.params.id})
    .then((sauce) => {res.status(200).json(sauce)})
    .catch((error) => {res.status(404).json({error: error})});
};

exports.modifySauces = async (req, res, next) => {

  const actualSauce = await Sauce.findOne({_id: req.params.id})
  const actualImg = actualSauce.imageUrl

  const sauceObject = (req.body.sauce !== undefined) ? JSON.parse(req.body.sauce) : req.body
  const newlyUploadedImagePath = (req.file !== undefined) ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : actualImg
    
  const sauce = new Sauce({
      userId: sauceObject.userId,
      name: sauceObject.name,
      manufacturer: sauceObject.manufacturer,
      description: sauceObject.description,
      mainPepper: sauceObject.mainPepper,
      heat: sauceObject.heat,
      likes: 0,
      dislikes: 0,
      usersLiked: [],
      usersDisliked: [],
      imageUrl: newlyUploadedImagePath
  });

  sauce._id = req.params.id

  console.log(sauce)

  Sauce.updateOne({_id: req.params.id}, sauce)
  .then(() => {res.status(201).json({message: 'Sauce modifiée !'})})
  .catch((error) => {res.status(400).json({error: error})});
};

exports.deleteSauces = (req, res, next) => {

  Sauce.deleteOne({_id: req.params.id})
    .then(() => {res.status(200).json({message: 'Sauce effacée !'})})
    .catch((error) => {res.status(400).json({error: error})});
};

exports.arraySauces = (req, res, next) => {
  Sauce.find()
    .then((sauces) => {res.status(200).json(sauces)})
    .catch((error) => {res.status(400).json({error: error})});
};

exports.likeSauces = (req, res, next) => {

};