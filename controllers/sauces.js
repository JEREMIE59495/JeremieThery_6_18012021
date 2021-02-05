const Sauce = require('../models/sauces');
const fs = require('fs');

//Ajouter un objet
exports.createSauce =  (req, res, next)=>{
    const sauceObject = JSON.parse( req.body.sauce);
    delete sauceObject._id;
    const newSauce = new Sauce({
     ...sauceObject,
     imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
     
    });
    newSauce.save()
    .then(() => res.status(201).json({message: 'Objet enregistre'}))
    .catch(error => res.status(400).json({error}));
  };

  //Modifier un objet
  exports.modifySauce =(req, res, next)=> {
    const sauceObject = req.file ?
    {
      ...JSON.parse( req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
     } : { ...req.body};
    Sauce.updateOne( {_id: req.params.id}, {...sauceObject,_id: req.params.id})
    .then(() => res.status(200).json({message:' Objet modifié !!'}))
  .catch(error => res.status(400).json ({error}))
  };

//Supprimer un objet

  exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
      .then(sauces => {
        const filename = sauces.imageUrl.split('/images/')[1];
        console.log(filename)
        fs.unlink( `images/${filename}`, () => {
          Sauce.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
            .catch(error => res.status(400).json({ error }));
        });
      })
      .catch(error => res.status(500).json({ error }))
  };

// Voir un objet
  exports.getOneSauce = (req, res,next)=> {
    Sauce.findOne({_id: req.params.id})
    .then(sauce => res.status(200).json(sauce))
  .catch(error => res.status(400).json ({error}))
  }

  //Voir tous les objet
  exports.getAllSauce = (req, res,next)=> {
    Sauce.find()
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(400).json ({error}))
    }

  // On ajoute un like ou un  dislike
  exports.likeDislike = (req, res, next) => {
    let like = req.body.like
    let userId = req.body.userId
    let sauceId = req.params.id

    //like

    if (like === 1) {
      Sauce.updateOne({ _id: sauceId},
        {
            $push: {usersLiked: userId},
            $inc: {likes: +1}
        })
        .then(() => res.status(200).json({message: 'Like ajouté '}))
        .catch((error) => res.status(400).json({error}))
    }

    //Dislike
    if (like === -1) {
      Sauce.updateOne({ _id: sauceId}, {
            $push: {usersDisliked: userId},
            $inc: {dislikes: +1},
          })
        .then(() => res.status(200).json({message: 'Dislike ajouté '}))
        .catch((error) => res.status(400).json({error}))
    }

  //On annule un like ou un dislike
  //On recupère l' Id de la sauce 
    if (like === 0) {
      Sauce.findOne({ _id: sauceId })
        .then((sauce) => {
          //on annule le like
          if (sauce.usersLiked.includes(userId)) {
            Sauce.updateOne({_id: sauceId}, {
                $pull: {usersLiked: userId},
                $inc: {likes: -1},
              })
              .then(() => res.status(200).json({message: 'Like annulé '}))
              .catch((error) => res.status(400).json({error}))
          }

          //On annule le dislike
          if (sauce.usersDisliked.includes(userId)) {
            Sauce.updateOne({ _id: sauceId}, {
                $pull: {usersDisliked: userId},
                $inc: {dislikes: -1},
              })
              .then(() => res.status(200).json({message: 'Dislike annulé '}))
              .catch((error) => res.status(400).json({error}))
          }
        })
        .catch((error) => res.status(404).json({error}))
    }


/*

    if (like === 0) {
      Sauce.findOne({ _id: sauceId })
        .then((sauce) => {
          //on annule le like
          if (sauce.usersLiked.includes(userId)) {
            Sauce.updateOne({_id: sauceId}, {
                $pull: {usersLiked: userId},
                $inc: {likes: -1},
              })
              .then(() => res.status(200).json({message: 'Like annulé '}))
              .catch((error) => res.status(400).json({error}))
          }*/





          

  }