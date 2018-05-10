var dockerCLI = require('docker-cli-js');
var DockerOptions = dockerCLI.Options;
var Docker = dockerCLI.Docker;


const exec = require('child_process').exec
const spawn = require('child_process').spawn
const Papa = require('papaparse')
const path = require('path');

const composeController = {}

composeController.ps = (req, res, next) => {
  exec('docker ps', (err, stout, sterr) => {
    const spaces = stout.replace(/ {2,}/g, '   ')
    var data = Papa.parse(spaces, {
      delimiter: "  ",
      header: true,
      newline: "",
      skipEmptyLines: true
    });
    res.send(data.data);
  })
}

composeController.dcfolder = (req, res, next) => {
  const folder = req.body.folder
  spawn(`cd ${folder}`)
  res.redirect('/')
  res.end()
}

composeController.dcup = (req, res, next) => {
  console.log(req.body.filePath);
  process.chdir(req.body.filePath);
  exec('docker-compose up', (err, stout, sterr) => {
    console.log(stout)
    console.log()
    if (err) console.log(err);
    if (sterr) console.log(sterr);
    res.end();
    // res.end();
  })
}

composeController.dcdwn = (req, res, next) => {
  exec('docker-compose down', (err, stout, sterr) => {
    if (err) console.log(err);
    if (sterr) console.log(sterr);
    res.end();
  })
}

composeController.dcstrt = (req, res, next) => {
  exec('docker-compose start', (err, stout, sterr) => {
    if (err) console.log(err);
    if (sterr) console.log(sterr);
    res.end();
  })
}

composeController.dcstp = (req, res, next) => {
  exec('docker stop $(docker ps -aq)', (err, stout, sterr) => {
    if (err) console.log(err);
    if (sterr) console.log(sterr);
    res.end();
  })
}

composeController.dcfile = (req, res, next) => {
  const dcFilePath = req.body.filePath
  exec(`cat ${dcFilePath}`, (err, stout, sterr) => {
    if (err) console.log(err);
    if (sterr) console.log(sterr);
    res.end();
  })
}


composeController.psa = (req, res, next) => {
  exec('docker ps -a', (err, stout, sterr) => {
    const spaces = stout.replace(/ {2,}/g, '   ')
    var data = Papa.parse(spaces, {
      delimiter: "  ",
      header: true,
      newline: "",
      skipEmptyLines: true
    });
    res.send(data.data);
  })
}

module.exports = composeController;
