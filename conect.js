//Ce fichier est a coller dans le dossier backend  lors de la mise en place  des fichiers

// Connexion mongodb
const mongoose =  require('mongoose');

mongoose.connect('mongodb+srv://jeremie:thery@cluster0.l2hz4.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));



