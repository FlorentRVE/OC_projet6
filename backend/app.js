// Importe le paquet express
const express = require('express');

// Crée une application express
const app = express();

app.use((req, res) => {
   res.json({ message: 'Votre requête a bien été reçue !' }); 
});

// Exporter l'app pour pouvoir y accèder depuis les autres fichiers
module.exports = app;