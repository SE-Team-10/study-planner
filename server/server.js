const express = require("express");
let busboy = require('connect-busboy');
var path = require('path');
const fs = require('fs');
const app = express(); 
const port = 5000;
const shortid = require('shortid');

var cors = require("cors");
const bodyParser = require('body-parser');

app.use(cors());

app.use(bodyParser.json())

let data = require('./userData/admin.json');


app.listen(port, () => console.log(`Listening on port ${port}`)); 

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use(busboy());

dynamicData = (data) => {
    data.totalSemesterProgress = 0;

    for (let i in data.moduleEvents) {
        if (data.moduleEvents[i].hasOwnProperty('tasks')) {
            data.moduleEvents[i].totalTasks = data.moduleEvents[i].tasks.length;
            let count = 0;
            for (let x in data.moduleEvents[i].tasks) {
                data.moduleEvents[i].totalProgressValue = 0;
                for (let m in data.moduleEvents[i].tasks) {
                    data.moduleEvents[i].totalProgressValue += parseInt(data.moduleEvents[i].tasks[m].progressValue);
                }
                data.moduleEvents[i].totalProgressValue = data.moduleEvents[i].totalProgressValue / data.moduleEvents[i].tasks.length;
                if (data.moduleEvents[i].tasks[x].progressValue === "100%") {
                    count = count + 1;
                }
                data.moduleEvents[i].tasksCompleted = count;
            }

        } else {
            data.moduleEvents[i].totalTasks = 0;
            data.moduleEvents[i].tasksCompleted = 0;
            data.moduleEvents[i].totalProgressValue = 0;
        }

        if (data.moduleEvents[i].hasOwnProperty('notes')) {
            data.moduleEvents[i].totalNotes = data.moduleEvents[i].notes.length;
        } else {
            data.moduleEvents[i].totalNotes = 0;
        }

        data.totalSemesterProgress += data.moduleEvents[i].totalProgressValue;
    }
    data.totalSemesterProgress = data.totalSemesterProgress / data.moduleEvents.length;
    return data;
}

data = dynamicData(data);

//send message from api to react app (client) that express is connected
app.get("/api", (req, res) => {
  //res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" });
  res.header("Content-Type",'application/json');
  res.send(data);
});

app.get("/api/semester-details", (req, res) => {
    //res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" });
    res.header("Content-Type",'application/json');

    res.send({semesterName:data.semesterName, totalSemesterProgress:data.totalSemesterProgress});
});


app.get("/api/modules", (req, res) =>{
  res.header("Content-Type",'application/json');
  res.send(data.modules);
})

app.get("/api/module/:id", (req,res)=>{
  const {id} = req.params;

  const foundModule = data.modules.find((module) => module.id === id);

  res.send(foundModule)
})

app.get("/api/module-events", (req, res) =>{
  res.header("Content-Type",'application/json');
  res.send(data.moduleEvents);
})

app.get("/api/module-events/upcoming", (req, res) =>{
    res.header("Content-Type",'application/json');

    const currentTime = new Date(Date.now());

    const jsonDate = currentTime.toJSON();

    res.send(data.moduleEvents.filter((mE)=>mE.actualEnd >= jsonDate));
})

app.get("/api/module-events/past", (req, res) =>{
    res.header("Content-Type",'application/json');
    const currentTime = new Date(Date.now());

    const jsonDate = currentTime.toJSON();

    res.send(data.moduleEvents.filter((mE)=>mE.actualEnd <= jsonDate));
})

app.get("/api/module-events/completed", (req, res) =>{
    res.header("Content-Type",'application/json');
    res.send(data.moduleEvents.filter((mE)=>mE.totalProgressValue === 100));
})

app.get("/api/module-events/uncompleted", (req, res) =>{
    res.header("Content-Type",'application/json');
    res.send(data.moduleEvents.filter((mE)=>mE.totalProgressValue !== 100));
})

app.get("/api/gantt", (req, res) =>{
    res.header("Content-Type",'application/json');
    let ganttData = data.moduleEvents;

    function taskToChildren (obj){
        obj["children"] = obj["tasks"];
        // delete obj["tasks"];
    }

    ganttData.forEach(obj => taskToChildren(obj));

    res.send(ganttData);
})


app.get("/api/module-event/:id",
    (req, res) => {
      const {id} = req.params;

      const i = data.moduleEvents.findIndex((moduleEvent) => moduleEvent.id === id);

      res.send(data.moduleEvents[i])
    })

app.get("/api/task/module-event=:mEName", (req,res)=>{
  const {mEName} = req.params;

  const foundTask = data.tasks.filter((task) => task.moduleEventName === mEName);

  res.send(foundTask)
})

app.get("/api/test", (req, res) => {
    res.send("Frontend (:3000) linked to backend (:5000)")
})

app.get("/api/module-event/:meID/note/:noteID", (req,res) => {
    const meID = req.params.meID;
    const noteID = req.params.noteID;

    const moduleEventIndex = data.moduleEvents.findIndex((moduleEvent) => moduleEvent.id === meID);
    const noteIndex = data.moduleEvents[moduleEventIndex].notes.findIndex((note) => note.id === noteID);

    //
    res.json(data.moduleEvents[moduleEventIndex].notes[noteIndex]);
})

app.delete("/api/module-event/:meID/note/:noteID", (req,res) => {
    //Index for the note, and the module-event it is a part of is identified

    const meID = req.params.meID;
    const noteID = req.params.noteID;

    const moduleEventIndex = data.moduleEvents.findIndex((moduleEvent) => moduleEvent.id === meID);
    const noteIndex = data.moduleEvents[moduleEventIndex].notes.findIndex((note) => note.id === noteID);

    data.moduleEvents[moduleEventIndex].notes.splice(noteIndex,1)

    res.json({"msg":"Note Successfully deleted"});
})

app.put("/api/module-event/:meID/note/:noteID", (req,res) => {
    const meID = req.params.meID;
    const noteID = req.params.noteID;

    const moduleEventIndex = data.moduleEvents.findIndex((moduleEvent) => moduleEvent.id === meID);
    const noteIndex = data.moduleEvents[moduleEventIndex].notes.findIndex((note) => note.id === noteID);

    data.moduleEvents[moduleEventIndex].notes[noteIndex] = req.body;
    //
    res.json(data.moduleEvents[moduleEventIndex].notes[noteIndex]);
})

app.post("/api/module-event/:meID/note/", (req,res) => {
    const meID = req.params.meID;

    const moduleEventIndex = data.moduleEvents.findIndex((moduleEvent) => moduleEvent.id === meID);

    const currentTime = new Date(Date.now());

    const jsonDate = currentTime.toJSON();

    const test = {id:shortid.generate(), text:"", dateCreated:jsonDate}


    data.moduleEvents[moduleEventIndex].notes.push(test);

    data.moduleEvents[moduleEventIndex].totalNotes += 1;
    //
    res.json(data.moduleEvents[moduleEventIndex].notes);
})






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
