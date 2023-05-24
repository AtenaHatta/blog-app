const express = require('express');
const app = express();

app.post('/register', (req, res) => {
    res.json({message: 'test ok'}) 
})

app.listen(4000)