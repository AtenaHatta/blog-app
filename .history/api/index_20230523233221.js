const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.join('test ok')
})

app.listen(8000)