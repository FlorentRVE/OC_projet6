// Importation du package jswebtoken
const jwt = require('jsonwebtoken');
const fs = require('fs');

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
    .then((sauce) => {res.status(200).json(sauce), console.log('détail de la sauce:' + sauce)})
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

  Sauce.findOne({ _id: req.params.id })
  .then(sauce => {
    
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
          Sauce.deleteOne({ _id: req.params.id })
              .then(() => res.status(200).json({ message: 'Sauce effacée !'}))
              .catch(error => res.status(400).json({ error }));
      })
  })
  .catch(error => res.status(500).json({ error }));
};

exports.arraySauces = (req, res, next) => {
  Sauce.find()
    .then((sauces) => {res.status(200).json(sauces)})
    .catch((error) => {res.status(400).json({error: error})});
};

exports.likeSauces = async (req, res, next) => {

    // Récupération des données dans le body de la requête
    const sauceObject = req.body;

    // Récupération de la sauce dans la BDD
    const actualSauce = await Sauce.findOne({_id: req.params.id})

    // Récupération des likes et userID dans la requête
    const reqLikes = sauceObject.like
    const reqID = sauceObject.userId

    const newLike = {
      likes: 0,
      dislikes: 0,
      usersLiked: actualSauce.usersLiked,
      usersDisliked: actualSauce.usersDisliked,
  };

    // Gestion des likes et dislikes
    switch (reqLikes) {
      case 1:  // sauce liked
      newLike.usersLiked.push(reqID);
      break;
      case -1:  // sauce disliked
      newLike.usersDisliked.push(reqID);
      break;
      case 0:  // Annulation like/dislike
          if (newLike.usersLiked.includes(reqID)) {
                // si on annule le like
              const index = newLike.usersLiked.indexOf(reqID);
              newLike.usersLiked.splice(index, 1);
        } else {
            // si on annule le dislike
              const index = newLike.usersDisliked.indexOf(reqID);
               newLike.usersDisliked.splice(index, 1);
        }
      break;
    };

  // Calcul du nombre de likes/dislikes en fonction de l'array correspondant
  newLike.likes = newLike.usersLiked.length;
  newLike.dislikes = newLike.usersDisliked.length;

Sauce.updateOne({_id: req.params.id}, newLike)
.then((result) => {res.status(201).json({message: 'Like statut changé !'}), console.log(result)})
.catch((error) => {res.status(400).json({error: error})});
};
