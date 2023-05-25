const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('../api/src/models/User.jsx');
const app = express();

app.use(cors());
app.use(express.json())

mongoose.connect('mongodb+srv://blog_test:gM4lEEyJVQud9nBX@cluster0.xt0cicu.mongodb.net/?retryWrites=true&w=majority')

app.post('/register',  async (req, res) => {
    const { username, password } = req.body;
    try{
        const userDoc = await User.create({ username, password });
        res.json(userDoc)
    }catch(e){
        res.status(400).json(e)
    }

    const userDoc = await User.create({ username, password });
    res.json(userDoc)
})

app.listen(8000)
