const express = require('express');
const bodyParser = require('body-parser');
const composeController = require('../controllers/composeController');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/docker-ps', composeController.ps);
app.post('/docker-composeps', composeController.dcps);
app.get('/psa', composeController.psa);
app.get('/dcstrt', composeController.dcstrt);
app.get('/dcfile', composeController.dcfile);
app.get('/dcps', composeController.dcps);
app.get('/dcstop', composeController.dcstp);
app.post('/dcup', composeController.dcup);
app.post('/dcdwn', composeController.dcdwn);
app.post('/dcfolder', composeController.dcfolder);

app.listen(3333, () => console.log('Listening on Port 3333!'));
