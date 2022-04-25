const express = require("express");
let busboy = require('connect-busboy');
var path = require('path');
const fs = require('fs');
const app = express(); 
const port = 5000;


app.listen(port, () => console.log(`Listening on port ${port}`)); 

app.use(busboy());

//send message from api to react app (client) that express is connected
app.get("/api", (req, res) => {
  res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" }); 
}); 

app.post('/api-upload', (req, res) => {
 req.busboy.on('file', function (fieldname, file, filename) {
   console.log("received file")
   console.log(fieldname)
   console.log(filename)
   var fstream = fs.createWriteStream('./userData/' + filename.filename);
   file.pipe(fstream);
   fstream.on('close', function () {
     res.send('upload succeeded!');
   });
 });
 req.pipe(req.busboy);
});

app.get('/api-download/:user', (req, res) => {
  const fileName = req.params.user+'.json';
  if (fs.existsSync('./userData/'+fileName)){
    console.log(fileName+" exists");
    res.sendFile(fileName, { root : path.join(__dirname, '/userData')});
    console.log("Sent: "+fileName);
  };
});
