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
}))
app.use(bodyParser.json())
app.use(express.static('public'));

app.use(express.static(__dirname + '/../public'));

app.get('/docker-ps', composeController.ps) // test docker-cli-js
app.get('/psa', composeController.psa)
app.get('/dcup', composeController.dcup)
app.get('/dcdwn', composeController.dcdwn)
app.get('/dcstrt', composeController.dcstrt)

app.get('/dcstop', composeController.dcstp)
app.post('/dcfolder', composeController.dcfolder)

app.get('/dcfile', composeController.dcfile)

app.listen(3333, () => {
  console.log('Listening on Port 3333!')
});
