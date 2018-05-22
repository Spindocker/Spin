var dockerCLI = require('docker-cli-js');
var DockerOptions = dockerCLI.Options;
var Docker = dockerCLI.Docker;

const exec = require('child_process').exec
const execSync = require('child_process').execSync
const spawn = require('child_process').spawn
const Papa = require('papaparse')
const path = require('path');

const io = require('socket.io')();
// io.listen(3333);

const composeController = {}

composeController.ps = (req, res, next) => {
  exec('docker ps', (err, stout, sterr) => {
    const spaces = stout.replace(/ {2,}/g, '   ')
    data = Papa.parse(spaces, {
      delimiter: "  ",
      header: true,
      newline: "",
      skipEmptyLines: true
    });

    function objLength(obj) {
      var size = 0, key;
      for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
      }
      return size;
    }

    psData = data.data
    for (let i = 0; i < psData.length; i += 1) {
      const length = objLength(psData[i])
      if (length < 7) {
        const names = psData[i][' PORTS'];
        delete psData[i][' PORTS'];
        psData[i][' NAME'] = names
      }
    }

    res.send(psData);
  })
}

/* middleware chain starts here: */
composeController.dcfolder = (req, res, next) => {
  const folder = req.body.folder
  spawn(`cd ${folder}`)
  res.redirect('/')
  res.locals.filePath = req.body.filePath;
  next();
}

composeController.dcup = (req, res, next) => {
  let filePath = req.body.filePath;
  exec('docker-compose up -d', {
    cwd: filePath
  }, (err, stout, sterr) => {
    if (err) console.log(err);
    if (sterr) console.log(sterr);
    // res.send(sterr); // Log console messages?
    // console.log('Hello from docker-compose ps!');
    res.end();
  });
}

composeController.dcdwn = (req, res, next) => {
  let filePath = req.body.filePath;
  exec('docker-compose down', {
    cwd: filePath
  }, (err, stout, sterr) => {
    if (err) console.log(err);
    if (sterr) console.log(sterr);
    res.end();
  });
}

composeController.dcps = (req, res, next) => {
  let filePath = req.body.filePath;
let filtering = []
let final = [];
exec('docker-compose ps', { cwd: filePath }, (err, stout, sterr) => {
  const spaces = stout.replace(/ {2,}/g, '  ')
  data = Papa.parse(stout, {
    header: false,
    trimHeader: false,
    delimiter: '   ',
    skipEmptyLines: true
  });
  // filtering = data.data
  data.data.reduce((acc, cur) => {
    const temp = []
    for (let i = 0; i < cur.length; i += 1) {
      if (cur[i]) {
        const trimmed = cur[i].trim()
        temp.push(trimmed)
      }
    }
    filtering.push(temp)
  }, [])
  for (let i = 2; i < filtering.length; i += 1) {
    const interim = {};
    for (let k = 0; k < 4; k += 1) {
      interim[filtering[0][k]] = filtering[i][k]
    }
    final.push(interim);
  }
  res.send(final);
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




