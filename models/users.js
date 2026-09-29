const mongoose=require('mongoose');

const  User = mongoose.model('User', {
    nom: String,
    email: String,
    pw: String
});



module.exports = User;