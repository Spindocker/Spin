var dockerCLI = require('docker-cli-js');
var DockerOptions = dockerCLI.Options;
var Docker = dockerCLI.Docker;

const exec = require('child_process').exec
const Papa = require('papaparse')
const path = require('path');

const composeController = {}

// app.use(express.static(__dirname + 'public/'));
// res.sendFile(path.resolve(__dirname, '../../public/index.html'))

composeController.ps = (req, res, next) => {
  let docker = new Docker();

  docker.command('ps', (err, data) => {
    res.send(data.raw);
    // res.send('TESTING PS!');
    res.end();
  })
}

composeController.folder = (req, res, next) => {
  const folder = req.body.folder
  exec(`cd ${folder}`)
}

composeController.dcup = (req, res, next) => {
  exec('docker-compose up', (err, stout, sterr) => {
    if (err) console.log(err);
    if (sterr) console.log(sterr);
    res.end();
    res.end();
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
  exec('docker-compose stop', (err, stout, sterr) => {
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
    const info = []
    // console.log(data.data)
    res.send(data.data);
  })
}

module.exports = composeController;