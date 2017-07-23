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
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:3000');
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

        GetDataGroupByDate().then((response) => {
            res.json(response);
        })

    });


router.route('/search/:start/:end')

    .get((req, res) => {

        let start = req.params.start ? req.params.start : 0;
        let end = req.params.end ? req.params.end : 999999999;
        GetDataRecords(start, end).then((response) => {

            //    console.log('this response2 '+JSON.stringify(response));
            res.json(response);
        })

    });

router.route('/updateType')

    .post((req, res) => {
        let id = req.body.id ? req.body.id : "596ec20f500174208cd07a99";
        let type = req.body.type ? req.body.type : 4;
        console.log("this is type " + type);
        UpdateRecorder(id, type).then((response) => {

            //    console.log('this response2 '+JSON.stringify(response));
            res.json(response);
        })

    });

router.route('/createConfig')
    .post((req, res) => {
         let labels = req.body.labels;
         let alias = req.body.alias;
         console.log("this is labels  "+labels);
        CreateSetting(alias,labels).then((response)=>{
            res.json(response);
        }

    )
})

router.route('/getSetting')
    .get((req, res) => {
         
        GetSetting().then((response)=>{
            res.json(response);
        }

    )
})

// router.route('/get/:address')

// .get((req, res) => {
//     GetDataGroupByDate();
// });


scheduleCronstyle();

app.use('/api', router);




app.listen(port, () => {
    console.log(`api running on port ${port}`);
});