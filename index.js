require('dotenv').config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const PORT = 80;
const app = express();
const router = require('./route/index');

app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.raw());
app.use(express.json());
app.use(cookieParser());
// app.use(cors({
//     credentials: true,
//     origin: process.env.CLIENT_URL,
// }));
app.use('/api', router);

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useUnifiedTopology: true
        });

        app.listen(PORT, () => console.log('server in ' + PORT))
    }catch (e) {
        console.log(e);
    }
};

start();