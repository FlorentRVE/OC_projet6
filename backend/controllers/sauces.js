// Importation du package jswebtoken
const jwt = require('jsonwebtoken');

// On utilise le model Sauce
const Sauce = require('../models/sauces');

// Actions à effectuer selon la route appelée
exports.createSauces = (req, res, next) => {

    console.log(req.body.sauce)
    
    const sauce = new Sauce({
        name: req.body.name,
        manufacturer: req.body.manufacturer,
        description: req.body.description,
        mainPepper: req.body.mainPepper,
        imageUrl: req.body.imageUrl,
        heat: req.body.heat,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: []
    });

    console.log(sauce)

  sauce.save()
    .then(() => {res.status(201).json({message: 'Sauce crée avec succès !'})})
    .catch((error) => {res.status(400).json({error: error})});
};

exports.singleSauces = (req, res, next) => {

  Sauce.findOne({_id: req.params.id})
    .then((sauce) => {res.status(200).json(sauce)})
    .catch((error) => {res.status(404).json({error: error})});
};

exports.modifySauces = (req, res, next) => {

  const sauce = new Sauce({
    _id: req.params.id,
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    userId: req.body.userId
  });

  Sauce.updateOne({_id: req.params.id}, sauce)
    .then(() => {res.status(201).json({message: 'Sauce updated !'})})
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