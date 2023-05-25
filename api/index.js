const express = require('express');
const cors = require('cors');
const User = require('@/api/models/User');
const app = express();

app.use(cors());
app.use(express.json())

mongoose.connect('mongodb+srv://blog:jDqmMqGf4X11ggzm@cluster0.glsk2nu.mongodb.net/?retryWrites=true&w=majority')


app.post('/register',  async (req, res) => {
    const { username, password } = req.body;
    const userDoc = await User.create({ username, password });
    res.json(userDoc)
})

app.listen(8000)
