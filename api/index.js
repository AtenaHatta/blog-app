const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('../api/src/models/User.js');
const bcrypt = require('bcryptjs');
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const salt = bcrypt.genSaltSync(10);
const secret = 'vfdgdnhtnmnrhgrsfsf'
const multer = require('multer'); //upload file
const uploadMiddleware = multer({ dest: 'uploads/' }); //upload file to "uploads" folder
const fs = require('fs'); //file system


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
    const passOk =  userDoc && bcrypt.compareSync(password, userDoc.password); // compare password

    if(passOk){
        // logged in
        jwt.sign({username, id:userDoc._id}, secret, {}, (err,token) => {
            if(err) throw err;
            res.cookie('token', token).json({ // Get userID and username
                id:userDoc._id,
                username,
            })
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


// Logout -----------------------------
app.post('/logout', (req, res) => {
    res.cookie('token', '').json('ok')
});


// file upload -----------------------------
app.post('/post', uploadMiddleware.single('file'), (req,res) => { // only single file can upload
  //to be able to see the file
  const { originalname, path } = req.file; //get data(originalname: example.png(file name), path: file path) from "req.file"
  console.log(req.file);
  const parts = originalname.split('.') // split "example.png" → ['example', 'png']
  const ext = parts[parts.length - 1] // ext = ['png']
  fs.renameSync(path, path + '.' + ext) // rename file as "uploads/example.png"
  // get a file data
  res.json({files:req.file});
})




app.listen(8000)
