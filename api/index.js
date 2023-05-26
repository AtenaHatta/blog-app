const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('../api/src/models/User.jsx');
const bcrypt = require('bcryptjs');
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const salt = bcrypt.genSaltSync(10);
const secret = 'vfdgdnhtnmnrhgrsfsf'


//cors allow to access "localhost:5173" to "localhost:8000"
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
app.use(express.json());
app.use(cookieParser());


//mongoDB's project code
mongoose.connect('mongodb+srv://blog_test:gM4lEEyJVQud9nBX@cluster0.xt0cicu.mongodb.net/?retryWrites=true&w=majority')


// Register -----------------------------
app.post('/register',  async (req, res) => {
    const { username, password } = req.body;
    
    // create unique userID with "bcrypt(libruary)"
    try{
        const userDoc = await User.create({ 
            username, 
            password:bcrypt.hashSync(password, salt)
        });
        res.json(userDoc)
    }catch(e){
        res.status(400).json(e)
    }
})


// Login -----------------------------
app.post('/login', async (req, res) => {
    const {username, password} = req.body;
    
    //check if username exists
    const userDoc = await User.findOne({ username });
    const passOk = userDoc && bcrypt.compareSync(password, userDoc.password); //compare password

    if(passOk){
        //logged in
        jwt.sign({username,id:userDoc._id}, secret, {}, (err,token) => {
           if(err) throw err;
           res.cookie('token', token).json('ok')
        })
    }else{
        res.status(400).json('Wrong credentials')
    }
})


// Get a token(id,username)
app.get('/profile', (req, res) => {
    const{ token } = req.cookies;
    jwt.verify(token, secret, {}, (err, info) => {
       if(err) throw err;
       res.json(info)
    })
})


app.post('/logout', (req, res) => {
    res.cookie('token', '').json('ok')
});


app.listen(8000)
