const express = require('express');
const test = express.Router();

test.get("/api/test", (req, res) => {
    res.send("Frontend (:3000) linked to backend (:5000)")
})

test.get("api/test/fuck",(req,res)=>{
    res.send(req.params)
})

module.exports = test;
