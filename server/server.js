const express = require("express");
let busboy = require('connect-busboy');
var path = require('path');
const fs = require('fs');
const app = express();
const port = 5000;
const shortid = require('shortid');

var cors = require("cors");
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

app.use(cors());

app.use(bodyParser.json())

var currentUser = "admin";
let accountData = require('./accountData.json');
let data = require('./userData/admin.json');

const errors = {
  semester: "Incorrect Semester",
  uname: "Invalid Username",
  pass: "Invalid Password"
};

app.listen(port, () => console.log(`Listening on port ${port}`));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use(busboy());

updateData = (user) => {
  return new Promise((resolve, reject) => {
    fs.readFile(`./userData/${user}.json`, 'utf-8', (err, contents) => {
      if (err) {
        resolve(true);
      }else if(contents){
        data = dynamicData(JSON.parse(contents.toString()));
        resolve(false);
      }
    })
  });
}

dynamicData = (data) => {
    data.totalSemesterProgress = 0;

    for (let i in data.moduleEvents) {
        if (data.moduleEvents[i].hasOwnProperty('tasks')) {
            if (data.moduleEvents[i].tasks.length === 0){
                data.moduleEvents[i].totalTasks = 0;
                data.moduleEvents[i].tasksCompleted = 0;
                data.moduleEvents[i].totalProgressValue = 0;
            } else {
                data.moduleEvents[i].totalTasks = data.moduleEvents[i].tasks.length;
                let count = 0;
                for (let x in data.moduleEvents[i].tasks) {
                    data.moduleEvents[i].totalProgressValue = 0;
                    for (let m in data.moduleEvents[i].tasks) {
                        data.moduleEvents[i].totalProgressValue += parseInt(data.moduleEvents[i].tasks[m].progressValue);
                    }
                    data.moduleEvents[i].totalProgressValue = Math.round(data.moduleEvents[i].totalProgressValue / data.moduleEvents[i].tasks.length);
                    if (data.moduleEvents[i].tasks[x].progressValue === "100%") {
                        count = count + 1;
                    }
                    data.moduleEvents[i].tasksCompleted = count;
                }
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
    data.totalSemesterProgress = Math.round(data.totalSemesterProgress / data.moduleEvents.length);

    data.moduleEvents.sort((a, b) =>  new Date(a.actualEnd) - new Date(b.actualEnd));
    return data;
}

//send message from api to react app (client) that express is connected
app.get("/api", (req, res) => {
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

app.get("/api/module/:name", (req,res)=>{
    const {name} = req.params;

    const moduleIndex = data.modules.findIndex((module) => module.name === name)

    res.send(data.modules[moduleIndex]);
})

app.get("/api/module-events", (req, res) =>{
  res.header("Content-Type",'application/json');
  res.send(data.moduleEvents);
})

app.get("/api/module-events/module=:moduleName", (req, res) =>{
    res.header("Content-Type",'application/json');
    const {moduleName} = req.params;


    res.send(data.moduleEvents.filter((mE)=>mE.moduleName === moduleName));
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

    res.json(data.moduleEvents[moduleEventIndex].notes);
})

//Retrieve Task
app.get("/api/module-event/:meID/task/:taskID", (req,res) => {
    const meID = req.params.meID;
    const taskID = req.params.taskID;

    const moduleEventIndex = data.moduleEvents.findIndex((moduleEvent) => moduleEvent.id === meID);
    const taskIndex = data.moduleEvents[moduleEventIndex].tasks.findIndex((note) => note.id === taskID);

    data = dynamicData(data);
    //
    res.json(data.moduleEvents[moduleEventIndex].tasks[taskIndex]);
})

//Delete Task
app.delete("/api/module-event/:meID/task/:taskID", (req,res) => {

    const meID = req.params.meID;
    const taskID = req.params.taskID;

    const moduleEventIndex = data.moduleEvents.findIndex((moduleEvent) => moduleEvent.id === meID);
    const taskIndex = data.moduleEvents[moduleEventIndex].tasks.findIndex((task) => task.id === taskID);

    data.moduleEvents[moduleEventIndex].tasks.splice(taskIndex,1)

    data = dynamicData(data);

    res.json({"msg":"Task Successfully deleted"});
})

//Update task
app.put("/api/module-event/:meID/task/:taskID", (req,res) => {
    const meID = req.params.meID;
    const taskID = req.params.taskID;

    const moduleEventIndex = data.moduleEvents.findIndex((moduleEvent) => moduleEvent.id === meID);
    const taskIndex = data.moduleEvents[moduleEventIndex].tasks.findIndex((task) => task.id === taskID);

    data.moduleEvents[moduleEventIndex].tasks[taskIndex] = req.body;

    data = dynamicData(data);

    res.json(data.moduleEvents[moduleEventIndex].tasks[taskIndex]);
})

app.post("/api/module-event/:meID/task/", (req,res) => {
    const meID = req.params.meID;

    const moduleEventIndex = data.moduleEvents.findIndex((moduleEvent) => moduleEvent.id === meID);

    const currentTime = new Date(Date.now());

    const jsonDate = currentTime.toJSON();

    const newTask = {id:shortid.generate(), name:"", actualStart:jsonDate, actualEnd:"", progressValue:"0%"}


    data.moduleEvents[moduleEventIndex].tasks.push(newTask);

    data = dynamicData(data);

    res.json(data.moduleEvents[moduleEventIndex].tasks);
})

app.post("/api/study-activity", (req,res) =>{
    const newStudyActivity = req.body;
    newStudyActivity.id = shortid.generate();



    for (let m in data.moduleEvents){
        for (let x in data.moduleEvents[m].tasks){
            if (data.moduleEvents[m].tasks[x].id === newStudyActivity.taskID){
                data.moduleEvents[m].tasks[x].progressValue = (newStudyActivity.taskProgressValue % 100) + "%";
            }
        }
    }

    data.studyActivities.push(newStudyActivity)
    data = dynamicData(data);
    res.json(data.studyActivities)
})

app.get("/api/study-activity", (req,res) =>{
    res.json(data.studyActivities)
})



app.post('/checkUser',jsonParser ,async function(req, res){
  let userLog = req.body;
  const userData = accountData.find((user) => user.userName === userLog.name);
  let code = 100;
  // Compare user info
  res.setHeader('Content-Type', 'application/json');
  if (userData) {
    if(userData.PassWord !== userLog.password){
      res.json({code: 100, name: "pass", message: errors.pass});
    } else if (userData.Semester !== userLog.semester) {
      res.json({code: 100, name: "semester", message: errors.semester});
    } else {
      console.log("success "+userData.userName+" is logged in");
      currentUser = userData.userName;
      const newUser = await updateData(currentUser);
      console.log(newUser)
      if (newUser){
        //new user logged in
        res.json({code: 200, name: userData.userName, new: true});
      }else{
        //existing user logged in
        res.json({code: 200, name: userData.userName, new: false});
      }
    }
  } else {
    // Username not found
    res.json({code: 100, name: "uname", message: errors.uname});
  }
});

app.post('/api-upload', (req, res) => {
 req.busboy.on('file', function (fieldname, file, filename) {
   console.log(filename);
   var fstream = fs.createWriteStream('./userData/' + filename.filename);
   file.pipe(fstream);
   fstream.on('close', function () {
     res.send('upload succeeded!');
   });
 });
 updateData(currentUser);
 req.pipe(req.busboy);
});

app.get('/api-download', (req, res) => {
  const fileName = `${currentUser}.json`;
  if (fs.existsSync(`./userData/${fileName}`)){
    console.log(fileName+" exists");
    res.download(path.join(__dirname, `./userData/${fileName}`), function(err){
      if(err){
        console.log(err)
      }
    });
    console.log("Sent: "+fileName);
  };
});

app.get("/forceUpdate", async function(req, res){
  if (fs.existsSync(`./userData/${currentUser}.json`) && (data !== null) && (data)){
    const tempData = JSON.stringify(data)
    fs.writeFile(`./userData/${currentUser}.json`, tempData, (err) => {
      if (err){
        throw err;
      }
    });
  };
  await updateData(currentUser);
  res.send("Updated");
})

app.get("/clearData", (req, res) => {
  data = null;
  res.send("Cleared");
})
