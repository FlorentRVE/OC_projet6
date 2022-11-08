// Importation du package Bcrypt et jswebtoken
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// On utilise le model d'User
const User = require('../models/users');

// Actions à effectuer selon la route appelée
exports.signup = async (req, res, next) => {

    const {email, password} = req.body;

    console.log("Sign up effectué !")

    await bcrypt.hash(password, 10)
      .then(hash => {
        const user = new User({
          email: email,
          password: hash
        });
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(() => res.status(400).json({ message: 'Email déjà existant' }));
      })
      .catch(error => res.status(500).json({ error }));
  };

exports.login = async (req, res, next) => {

    console.log("Login effectué !")
    
    await User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
 };