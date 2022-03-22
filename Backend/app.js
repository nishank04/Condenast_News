const express = require("express");
const app = express();
var cors = require('cors');
var jwt = require('jsonwebtoken');
const jwttoken = "jwt";
const User = require("./model/User");
const bodyParse = require('body-parser')
const bcrypt = require('bcrypt');

var jsonParser = bodyParse.json();
require("./db/conn");
app.use(cors());


app.post("/register", jsonParser, async(req, res) => {

    let body = req.body;

console.log(body);
    let hasedPassword = await bcrypt.hash(req.body.password, 10);


console.log(hasedPassword);
    const newUser = new User({
        name: body.name,
        email: body.email,
      
        password: hasedPassword
    });
    newUser.save().then((result) => {
        jwt.sign({ result }, jwttoken, { expiresIn: '300s' }, (err, token) => {
            res.status(201).json({ token,email:body.email });
        })
    }).catch(error => res.status(500).send(error))

})

app.post('/login', jsonParser, async(req, res) => {

    const body = req.body;
try{
    var user = await User.findOne({ email: body.email });

    var success = await bcrypt.compare(body.password, user.password);
    if (success) {
        const token = jwt.sign({ user }, jwttoken, { expiresIn: '300s' });
        res.status(200).json({ token ,email:body.email})

    } else {
        res.status(300).json({ message: "login failed" })
    }}
catch(err){

res.status(500).json({message:"error login"})
}

})

app.listen(5000, () => {

    console.log("app running at port 5000")
})