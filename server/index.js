const express = require('express');
const mongoose = require('mongoose');

const cors = require('./middlewares/cors');
// const auth = require('./middlewares/auth');
const catalogController = require('./controllers/catalog');
// const userController = require('./controllers/users');

start();

async function start(params) {

    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/furniture', {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });

        console.log('Database ready');
    } catch (err) {
        console.log('Database connection failed');
        process.exit(1);
    }

    const app = express();
    app.use(express.json());
    app.use(cors());
    // app.use(auth())
    app.use('/data/catalog', catalogController);
    // app.use('/users', userController)

app.get('/', (req, res) => res.json({ message: 'REST service operational '}))

    app.listen(3030, () => console.log('http://localhost:3030'))
}