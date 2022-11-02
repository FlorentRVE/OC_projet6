// Importe le paquet express
const express = require('express');

// Importe le paquet Mongoose
const mongoose = require('mongoose');

// Crée une application express
const app = express();

// Connection à la BDD mongoDB
mongoose.connect('mongodb+srv://oc_projet_6:oc_projet_6@atlascluster.xd5cg5x.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Définition des routes
const UserRoutes = require('./routes/users');
// const SauceRoutes = require('./routes/sauces');

// Configuration
// app.use((req, res, next) => {
//    res.setHeader('Access-Control-Allow-Origin', '*');
//    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
//    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
//    next();
//  });
 
//  app.use('/images', express.static(path.join(__dirname, 'images')));
//  app.use(express.static('images'));
 
//  app.use(express.urlencoded({extended: true}));
//  app.use(express.json());
//  //

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use((req, res) => {
   res.json({ message: 'Votre requête a bien été reçue !' }); 
});

// Affectation des routes
app.use('/api/auth', UserRoutes);
// app.use('/api/sauces', SauceRoutes);

// Exporter l'app pour pouvoir y accèder depuis les autres fichiers
module.exports = app;

