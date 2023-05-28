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

//cors allow to access "localhost:5173" to "localhost:8000"
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use(cookieParser());

const staticFilePath = path.join(__dirname, 'uploads');
app.use(express.static(staticFilePath));

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
    jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
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
    jwt.verify(token, secret, {}, async (err, decoded) => {
      if (err) {
        // Handle token verification error
        console.error(err);
        return res.status(401).json({ error: "Invalid token" });
      }
  
      const { id } = decoded; // Assuming the ID is stored in the 'id' property of the 'decoded' object
  
      const { title, summary, content } = req.body;
      const postData = {
        title,
        summary,
        content,
        author: id,
      };
      
      if (newPath !== "") {
        postData.cover = newPath;
      }
  
      const postDoc = await Post.create(postData);
  
      res.json(postDoc);
    });
  });
  

// Get all posts -----------------------------
app.get("/post", async (req, res) => {
  res.json(await Post.find());
});

app.listen(8000, () => {
    console.log("Server started");
    });
