const passwordSchema = require('../models/password');


// Contrôle les caractères du Mdp
module.exports = (req, res, next) => {
    if (!passwordSchema.validate(req.body.password))
    {  res.writeHead(400,
        ': Votre mot de passe doit contenir: 8 caractères minimun avec 1 Majuscule, 1 minuscule et sans espaces', {
            'content-type': 'application/json'
        });
        res.end();
    } else {
        next();
    }
};