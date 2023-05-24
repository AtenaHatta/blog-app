const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.json({message: 'test ok'}})
})

app.listen(8000)