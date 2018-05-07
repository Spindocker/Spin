

const composeController = {}

composeController.folder = (req, res, next) => {
  const folder = req.body.folder
  exec(`cd ${folder}`)
}

composeController.dcup = (req, res, next) => {
  exec('docker-compose up', (err, stout, sterr) => {
    if (err) console.log(err);
    if (sterr) console.log(sterr);
    console.log()
  })
}

composeController.dcdwn = (req, res, next) => {
  exec('docker-compose down', (err, stout, sterr) => {
    if (err) console.log(err);
    if (sterr) console.log(sterr);
    console.log()
  })
}

composeController.dcstrt = (req, res, next) => {
  exec('docker-compose start', (err, stout, sterr) => {
    if (err) console.log(err);
    if (sterr) console.log(sterr);
    console.log()
  })
}

composeController.dcstp = (req, res, next) => {
  exec('docker-compose stop', (err, stout, sterr) => {
    if (err) console.log(err);
    if (sterr) console.log(sterr);
    console.log()
  })
}

composeController.dcfile = (req, res, next) => {
  const dcFilePath = req.body.filePath
  exec(`cat ${dcFilePath}`, (err, stout, sterr) => {
    if (err) console.log(err);
    if (sterr) console.log(sterr);
    console.log()
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
    console.log(data.data)
  })
}

module.exports = composeController;