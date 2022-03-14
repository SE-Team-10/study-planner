const express = require("express");
const app = express(); 
const port = 5000;


app.listen(port, () => console.log(`Listening on port ${port}`)); 


//send message from api to react app (client) that express is connected
app.get("/api", (req, res) => {
  res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" }); 
}); 
