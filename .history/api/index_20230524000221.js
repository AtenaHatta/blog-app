const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/register', (req, res) => {
    res.json({message: 'test ok'}) 
    
})

app.listen(8000)