// Importe le paquet express
const express = require('express');

const path = require('path');

// Crée une application express
const app = express();

// Récupération des routes
const UserRoutes = require('./routes/users');
const SaucesRoutes = require('./routes/sauces');

// Importe le paquet Mongoose
const mongoose = require('mongoose');

// Connection à la BDD mongoDB
mongoose.connect('mongodb+srv://oc_projet_6:oc_projet_6@atlascluster.xd5cg5x.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// ==== Configuration ====
// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Ecoute les requêtes concernant la route '/images' et les liér au répertoire 'images'
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(express.urlencoded({extended: true})); // Permet de récupérer le body de la requête
app.use(express.json());
// ==== Fin des configuration ====

// Affectation des routes
app.use('/api/auth', UserRoutes);
app.use('/api/sauces', SaucesRoutes);

// Exporter l'app pour pouvoir y accèder depuis les autres fichiers
module.exports = app;

