const express = require('express');
const app = express();

app.get('/register', (req, res) => {
    res.json({message: 'test ok'}) 
})

app.listen(4000)