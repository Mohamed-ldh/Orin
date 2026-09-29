const express = require('express');

require('./config/connect')

const app = express();
app.use(express.json());

const Appoint=require('./models/appoint')
const Users=require('./models/users')

const path = require("path");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}))
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt");

app.use("/img", express.static(__dirname + "/img"));
app.use(express.static(path.join(__dirname, "public")));


app.get("/", function(req, res){
    res.sendFile(__dirname + "public/index.html")
})

app.get("/", function toLogin(req, res){
    res.sendFile(__dirname + "public/login.html")
})

app.get("/", function toSignUp(req, res){
    res.sendFile(__dirname + "public/signup.html")
})

//-------------Users-----------------------------------------
//post


app.post('/', (req, res)=>{

    let userData= {
        nom: req.body.nom,
        email: req.body.mail,
        pw: req.body.pw,
    };
    let user = new Users(userData);
    let salt= bcrypt.genSaltSync(10)
    let cryptedPass = bcrypt.hashSync( userData.pw, salt);

    user.pw = cryptedPass;

    user.save()
        .then(
            (signup)=>{
                res.sendFile(__dirname + "/public/login.html");
            }
        )
        .catch(
            (err)=>{
                console.log(err);
            }
        )
})


//login
app.post('/login', (req, res) => {
    const { email, pw } = req.body;

  Users.findOne({ email })
    .then((result) => {
      if (!result) {
        return res.status(400).json({ message: 'Invalid email!' });
      }

      const validPass = bcrypt.compareSync(pw, result.pw);
      if (!validPass) {
        return res.status(400).json({ message: 'Invalid password!' });
      }else{
        let payload = {
            firstname: result.firstname,
            lastname: result.lastname,
            email: result.email,
            _id: result._id,

        }

        let token = jwt.sign (payload, '123456789');
        res.redirect(`/indexLogedIn.html?name=${encodeURIComponent(result.nom)}`);
      }

    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
    });
});


app.post('/uploadAppoint', (req, res)=>{

    let appointData= {
        nomBarbier: req.body.barbNom,
        date: req.body.date,
        heure: req.body.time,
        msg: req.body.msg
    };
    let appoint = new Appoint(appointData);


    appoint.save()
        .then(
            (signup)=>{
                
                res.sendFile(__dirname + "/public/indexLogedIn.html");
            }
        )
        .catch(
            (err)=>{
                console.log(err);
            }
        )
})


app.listen(3000, ()=>{
    console.log("Server is working!");
}); 