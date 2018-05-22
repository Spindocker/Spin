const express = require('express');
const bodyParser = require('body-parser');
const composeController = require('../controllers/composeController');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/docker-ps', composeController.ps);
app.get('/psa', composeController.psa);
app.get('/dcstop', composeController.dcstp);
app.post('/dcup', composeController.dcup);
app.post('/dcdwn', composeController.dcdwn);

app.get('/getImages', composeController.getImages);

app.listen(3333, () => console.log('Listening on Port 3333!'));
