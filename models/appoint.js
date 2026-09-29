const mongoose=require('mongoose');

const  Appoint = mongoose.model('Appoint', {
    nomBarbier: String,
    date: String,
    heure: String,
    msg: String
});



module.exports = Appoint;