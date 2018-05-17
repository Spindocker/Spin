var dockerCLI = require('docker-cli-js');
var DockerOptions = dockerCLI.Options;
var Docker = dockerCLI.Docker;

const exec = require('child_process').exec
const execSync = require('child_process').execSync
const spawn = require('child_process').spawn
const Papa = require('papaparse')
const path = require('path');

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
  // res.send(req.body.filePath);
  const folder = req.body.folder
  spawn(`cd ${folder}`)
  res.redirect('/')
  res.locals.filePath = req.body.filePath;
  next();
}

composeController.dcup = (req, res, next) => {
  // /Users/excursos/Desktop/docker_todo/app-assessment-mod-0/
  // ^^ aka, valid directory with docker-compose file

  let filePath = req.body.filePath;
  // get req.body!!! sending incorrectly
  console.log(filePath);
  // console.log(`Input!!! ${filePath}`);
  exec('docker-compose up -d', { cwd: filePath }, (err, stout, sterr) => {
    if (err) console.log(err);
    if (sterr) console.log(sterr);
    console.log('Hello from docker-compose ps!');
    res.end();
  });
  // next();
}

composeController.dcps = (req, res, next) => {
  let filePath = req.body.filepathFetch;
  let psData;
  let dcpsData;
  exec('docker-compose ps', { cwd: filePath }, (err, stout, sterr) => {
    const spaces = stout.replace(/ {2,}/g, '   ')
    data = Papa.parse(spaces, {
      delimiter: "  ",
      // header: true,
      newline: "",
      skipEmptyLines: true
    });

    function objLength(obj) {
      let size = 0;
      let key;
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

    // () =>  {
    //   const final = data.data
    //   for (let i = 0; i < final.length; i += 1){
    //     const names = final[i][' PORTS'];
    //     delete final[i][' PORTS'];
    //     final[i][' NAME'] = names
    // }}

    console.log(psData)
    res.send(psData);
  })
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
