const mongoose = require ('mongoose');

const saucesSchema = mongoose.Schema({
    
    name: { type :String, required: true},
    manufacturer: { type: String, required: true },
    description: { type: String, required: true},
    mainPepper: { type: String, required: true},
    heat :{ type: Number , required: true},
    userId: { type: String, required: true},
    imageUrl: { type: String , required: true},
    likes: { type: Number},
    dislikes: { type: Number},
    usersLiked: { type: [String], default: undefined},
    usersDisliked: { type: [String], default: undefined}
})

module.exports = mongoose.model('sauces', saucesSchema);