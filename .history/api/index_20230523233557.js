const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.json({message: 'test oks'})
})

app.listen(4000)