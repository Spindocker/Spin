const { exec } = require('child_process');
const Papa = require('papaparse');

const composeController = {};

composeController.ps = (req, res, next) => {
  exec('docker ps', (err, stout, sterr) => {
    const spaces = stout.replace(/ {2,}/g, '   ');
    const data = Papa.parse(spaces, {
      delimiter: '  ',
      header: true,
      newline: '',
      skipEmptyLines: true,
    });
    const psData = data.data;
    for (let i = 0; i < psData.length; i += 1) {
      const { length } = Object.keys(psData[i]);
      if (length < 7) {
        const names = psData[i][' PORTS'];
        delete psData[i][' PORTS'];
        psData[i][' NAME'] = names;
      }
    }
    console.log(psData);
    res.send(psData);
  });
};

composeController.getImages = (req, res) => {
  exec('docker images', (err, stout, sterr) => {
    const spaces = stout.replace(/ {2,}/g, '    ');
    const data = Papa.parse(spaces, {
      header: true,
      trimHeader: false,
      delimiter: '   ',
      skipEmptyLines: true,
    });
    res.send(data.data);
  });
};

// Add check ability for it not in directory with yml file.
composeController.dcup = (req, res, next) => {
  const { filePath } = req.body;
  exec('docker-compose up -d', {
    cwd: filePath,
  }, (err, stout, sterr) => {
    if (err) console.log(err);
    if (sterr) console.log(sterr);
    res.end();
  });
};

composeController.dcdwn = (req, res, next) => {
  const { filePath } = req.body;
  exec('docker-compose down', {
    cwd: filePath,
  }, (err, stout, sterr) => {
    if (err) console.log(err);
    if (sterr) console.log(sterr);
    res.end();
  });
};

composeController.dcstp = (req, res, next) => {
  exec('docker stop $(docker ps -aq)', (err, stout, sterr) => {
    if (err) console.log(err);
    if (sterr) console.log(sterr);
    res.end();
  });
};


composeController.psa = (req, res, next) => {
  exec('docker ps -a', (err, stout, sterr) => {
    const spaces = stout.replace(/ {2,}/g, '   ');
    const data = Papa.parse(spaces, {
      delimiter: '  ',
      header: true,
      newline: '',
      skipEmptyLines: true,
    });
    const psaData = data.data;
    for (let i = 0; i < psaData.length; i += 1) {
      const { length } = Object.keys(psaData[i]);
      if (length < 7) {
        const names = psaData[i][' PORTS'];
        delete psaData[i][' PORTS'];
        psaData[i][' NAMES'] = names;
      }
    }
    res.send(psaData);
  });
};

module.exports = composeController;
