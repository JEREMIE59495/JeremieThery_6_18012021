//Impôrt des différents module
const express = require('express');
const mongoose =  require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const sauceRoutes= require ('./routes/sauces');
const userRoutes = require('./routes/user');



//Connection a mongoDb

  mongoose.connect('mongodb+srv://jeremie:thery@cluster0.l2hz4.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
  
const app = express();

//Création de header pour communication  CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname,'images')));

app.use ('/api/sauces', sauceRoutes);
app.use('/api/auth/', userRoutes);

module.exports = app;