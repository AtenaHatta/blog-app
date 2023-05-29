const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("../api/src/models/User.js");
const Post = require("../api/src/models/Post.js");
const bcrypt = require("bcryptjs");
const app = express();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const salt = bcrypt.genSaltSync(10);
const secret = "vfdgdnhtnmnrhgrsfsf";
const multer = require("multer"); //upload file
const uploadMiddleware = multer({ dest: "uploads/" }); //upload file to "uploads" folder
const fs = require("fs"); //file system
const path = require('path');
const { log } = require("console");

//cors allow to access "localhost:5173" to "localhost:8000"
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads',express.static(path.join(__dirname + '/uploads')));


//mongoDB's project code
mongoose.connect(
  "mongodb+srv://blog_test:gM4lEEyJVQud9nBX@cluster0.xt0cicu.mongodb.net/?retryWrites=true&w=majority"
);

// Register -----------------------------
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  // create unique userID with "bcrypt(libruary)"
  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(400).json(e);
  }
});

// Login -----------------------------
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  //check if username exists
  const userDoc = await User.findOne({ username });
  const passOk = userDoc && bcrypt.compareSync(password, userDoc.password); // compare password

  if (passOk) {
    // logged in
    jwt.sign({ username, id: userDoc._id }, secret, {}, async (err, token) => {
      if (err) throw err;
      res.cookie("token", token).json({
        // Get userID and username
        id: userDoc._id,
        username,
      });
    });
  } else {
    res.status(400).json("Wrong credentials");
  }
});

// Get a token(id,username)
app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
});

// Logout -----------------------------
app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});


// Post update ------------------------
app.post("/post", uploadMiddleware.single("file"), async (req, res) => {
    let newPath = "";
    
    if (req.file) {
      const { originalname, path } = req.file;
      console.log(req.file);
      const parts = originalname.split(".");
      const ext = parts[parts.length - 1];
      newPath = path + "." + ext;
      fs.renameSync(path, path + "." + ext);
    }
    
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
      if (err)throw err;
      const { title, summary, content } = req.body;
      const postDoc = await Post.create({
        title,
        summary,
        content,
        cover: newPath,
        author: info.id, 
      });
      res.json(postDoc);
    });
  });
  

app.put("/post", uploadMiddleware.single("file"), async (req, res) => {
  let newPath = null;
  if(req.file){
    const { originalname, path } = req.file;
    console.log(req.file);
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    newPath = path + "." + ext;
    fs.renameSync(path, path + "." + ext);
  }
   const { token } = req.cookies;
   jwt.verify(token, secret, {}, async (err, info) => {

    
    if (err)throw err;
    const {id, title, summary, content} = req.body;
    const postDoc = await Post.findById(id);
    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
    if(!isAuthor){
      return res.status(400).json('you are not the author')
    }
    await postDoc.update({
      title, 
      summary, 
      content,
      cover: newPath ? newPath : postDoc.cover,
    })
    res.json(postDoc);
  });
});

// Get all posts -----------------------------
app.get("/post", async (req, res) => {
  res.json(await Post.find()
     .populate('author', ['username']) // populate: connect to User model
     .sort({createdAt: -1}) // sort: createdAt: -1 → show the latest post
     .limit(20) // limit: show 20 posts
  );
});

app.get('/post/:id', async (req, res) => {
  const { id } = req.params;
  const postDoc = await Post.findById(id).populate('author', ['username']);
  res.json(postDoc);
});

app.listen(8000, () => {
    console.log("Server started");
    });
