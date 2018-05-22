const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const composeController = require('../controllers/composeController');
const exec = require('child_process').exec
const Papa = require('papaparse')
const path = require('path');

var dockerCLI = require('docker-cli-js');
var DockerOptions = dockerCLI.Options;
var Docker = dockerCLI.Docker;

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());
app.use(express.static('public'));

app.use(express.static(__dirname + '/../public'));

app.get('/docker-ps', composeController.ps) // test docker-cli-js
app.get('/psa', composeController.psa)
app.get('/dcstrt', composeController.dcstrt)
app.get('/dcfile', composeController.dcfile)
app.get('/dcps', composeController.dcps)
app.get('/dcstop', composeController.dcstp)

app.post('/docker-composeps', composeController.dcps)
app.post('/dcup', composeController.dcup)
app.post('/dcdwn', composeController.dcdwn)
app.post('/dcfolder', composeController.dcfolder)

app.listen(3333, () => {
  console.log('Listening on Port 3333!')
});
