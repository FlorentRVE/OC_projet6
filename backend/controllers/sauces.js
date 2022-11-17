// Importation du package jswebtoken
const jwt = require('jsonwebtoken');
const { update } = require('../models/sauces');

// On utilise le model Sauce
const Sauce = require('../models/sauces');

// Actions à effectuer selon la route appelée
exports.createSauces = (req, res, next) => {
  
  // Récupération des données dans le body de la requête
  const sauceObject = JSON.parse(req.body.sauce);
    
  // Création d'une nouvelle sauce à partir du modèle 'Sauce'  
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

  // Insertion de la sauce dans la BDD
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

  // Récupération de l'url de l'image de la sauce pré-modification qu'on utilisera si l'image reste la même
  const actualSauce = await Sauce.findOne({_id: req.params.id})
  const actualImg = actualSauce.imageUrl

  // Si modification de l'image alors on doit utiliser JSON.parse, sinon on récupére simplement le body de la requête tel quel
  const sauceObject = (req.body.sauce !== undefined) ? JSON.parse(req.body.sauce) : req.body

  // Si modificaton de l'image on crée un nouveau chemin, sinon on utilise le chemin déjà existant de l'image non modifié récupéré plus haut
  const ImagePath = (req.file !== undefined) ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : actualImg
    
  // On utilise nos 2 constantes plus haut pour la modification de la sauce
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
      imageUrl: ImagePath
  });

  // On remplace l'id généré automatiquement par 'new Sauce' par l'id de la sauce qu'on modifie
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