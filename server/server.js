const express = require('express');
const app = express();
const bodyParser = require('body-parser');
bodyParser.urlencoded({ extended: true })
const composeController = require('../controllers/composeController');
const exec = require('child_process').exec
const Papa = require('papaparse')
const path = require('path');

var dockerCLI = require('docker-cli-js');
var DockerOptions = dockerCLI.Options;
var Docker = dockerCLI.Docker;

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/index.html'))
});

app.get('/docker-ps', composeController.ps) // test docker-cli-js
app.get('/psa', composeController.psa)
app.get('/dcup', composeController.dcup)
app.get('/dcdwn', composeController.dcdwn)
app.get('/dcstrt', composeController.dcstrt)
app.get('/dcstop', composeController.dcstp)
app.get('/dcfolder', composeController.folder)
app.get('/dcfile', composeController.dcfile)

exec('docker ps -a', (err, stout, sterr) => {
  const spaces = stout.replace(/ {2,}/g, '   '  )
  var data = Papa.parse(spaces, {
    delimiter: "  ",
    header: true,
    newline: "",
    skipEmptyLines: true
  });
  const info = []
  console.log(data.data)
})

app.listen(3333, () => {
  console.log('Listening on Port 3333!')
});
