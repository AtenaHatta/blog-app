const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('../api/src/models/User.jsx');
const bcrypt = require('bcryptjs');
const app = express();
const jwt = require('jsonwebtoken');

const salt = bcrypt.genSaltSync(10);

app.use(cors());
app.use(express.json())

//mongoDB's project code
mongoose.connect('mongodb+srv://blog_test:gM4lEEyJVQud9nBX@cluster0.xt0cicu.mongodb.net/?retryWrites=true&w=majority')


// Regisster
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
    const userDoc = await User.create({ username, password });
    res.json(userDoc)
})


// Login
app.post('/login', async (req, res) => {
    const {username, password} = req.body;
    //check if username exists
    const userDoc = await User.findOne({username});
    const passOk = bcrypt.compareSync(password, userDoc.password); //compare password
    res.json(passOk)
    if(passOk){
        //logged in

    }else{
        res.status(400).json({message: 'Wrong password'})
    }
    
})




app.listen(8000)
