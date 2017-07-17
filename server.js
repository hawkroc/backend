//server.js
'use strict'
const schedule = require('./server/schedule');
const express = require('express');

const bodyParser = require('body-parser');
const app = express();
const router = express.Router();

const mogo = require('./server/mongooseProxy');
const port = 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//To prevent errors from Cross Origin Resource Sharing, we will set our headers to allow CORS with middleware like so:
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});
//test api
router.get('/', (req, res) => {
    res.json({ message: 'API success?' });
});


router.route('/groupby/:keyword')

.get((req, res) => {
    GetDataGroupByDate();
});


router.route('/get/:address')

.get((req, res) => {
    GetDataGroupByDate();
});


scheduleCronstyle();

app.use('/api', router);




app.listen(port, () => {
    console.log(`api running on port ${port}`);
});
