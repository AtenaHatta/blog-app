const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.post('/register', (req, res) => {
    res.json({message: 'test ok'}) 
     
})

app.listen(8000)