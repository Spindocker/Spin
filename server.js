const express = require('express');
const app = express();
const bodyParser = require('body-parser');
bodyParser.urlencoded({ extended: true })
const composeController = require('./controllers/composeController');
const exec = require('child_process').exec
const Papa = require('papaparse')

// app.get('/psa', composeController.psa)
// app.get('/dcup', composeController.dcup)
// app.get('/dcdwn', composeController.dcdwn)
// app.get('/dcstrt', composeController.dcstrt)
// app.get('/dcstp', composeController.dcstp)
// app.get('/dcfolder', composeController.folder)
// app.get('/dcfile', composeController.dcfile)
// app.listen(3333, function () {console.log('Listening on Port 3333!')})



exec('docker ps -a', (err, stout, sterr) => {
  const spaces = stout.replace(/ {2,}/g, '   '  )
  var data = Papa.parse(spaces, {
    delimiter: "  ",
    // header: true,
    newline: "",
    skipEmptyLines: true
  });
  const info = []
  console.log(data.data)
})





  