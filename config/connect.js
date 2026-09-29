const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/orin')
    .then(
        ()=>{
            console.log('Connected to Orin db');
        }
    )
    .catch(
        (err)=>{
            console.log(err)
        }
    )