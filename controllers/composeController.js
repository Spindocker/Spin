var dockerCLI = require('docker-cli-js');
var DockerOptions = dockerCLI.Options;
var Docker = dockerCLI.Docker;

const exec = require('child_process').exec
const execSync = require('child_process').execSync
const spawn = require('child_process').spawn
const Papa = require('papaparse')
const path = require('path');

const composeController = {}

// app.use(express.static(__dirname + 'public/'));
// res.sendFile(path.resolve(__dirname, '../../public/index.html'))

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

/* middleware chain starts here: */
composeController.dcfolder = (req, res, next) => {
  // res.send(req.body.filePath);
  const folder = req.body.folder
  // spawn(`cd ${folder}`)
  res.redirect('/')
  res.locals.filePath = req.body.filePath;
  next();
}

composeController.dcup = (req, res, next) => {
  // { cwd: path }
  // /Users/excursos/Desktop/docker_todo/app-assessment-mod-0/
  // ^^ aka, valid directory with docker-compose file
  let filePath = res.locals.filePath;
  console.log(`Input: ${filePath}`);
  exec('docker-compose up -d', { cwd: filePath }, (err, stout, sterr) => {
    if (err) console.log(err);
    if (sterr) console.log(sterr);
    console.log('Hello!');    
    res.end();
  });
  next();
}

composeController.dcps = (req, res, next) => {
  // console.log('hello!')
  exec('docker-compose ps'), (err, stout, sterr) => {
    console.log(stout);
  }
}
/* middleware chain ends here */

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
    res.send(data.data);
  })
}

module.exports = composeController;
