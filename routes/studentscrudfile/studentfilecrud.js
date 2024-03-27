const express = require('express')
const fs = require("fs");

const path = require('path');
const router = express.Router()
router.get('/', (req, res) => {
    res.render('studentfilecrud/form');
  })
  
  // form data save /form
  
  router.post('/form', (req, res) => {
    const filePath = "./user.json";
    var uniqueId = Math.floor(Math.random() * 10000);
    let userDataArray = [];
    fs.readFile(filePath, (err, data) => {
      try {
  
        if (err) console.log(err);
        if (data.length == 0) {
          tmp = req.body;
          tmp.id = uniqueId;
          userDataArray.push(tmp);
          fs.writeFileSync(filePath, JSON.stringify(userDataArray));
        }
        else {
          userDataArray = JSON.parse(data);
          tmp = req.body;
          tmp.id = uniqueId;
          userDataArray.push(tmp);
          fs.writeFileSync(filePath, JSON.stringify(userDataArray));
        }
        res.end("Data added...")
      } catch (error) {
        res.write("Try again")
        return res.end()
      }
    })
  
    res.send("Data print...&#128521;");
  })
  
  // url type /user/
  
  router.get('/user', (req, res) => {
    const filePath = "./user.json";
    fs.readFile(filePath, (err, data) => {
      try {
  
        if (err) console.log(err);
        if (data.length == 0) {
          res.send("No data")
        }
        else {
          res.render('studentfilecrud/allstudent', { data: JSON.parse(data) })
        }
        // res.end("Data added...")
      } catch (error) {
        res.write("Try again")
        return res.end()
      }
    })
  })
  
  // particular studentdata show url /user/id
  
  router.get('/user/:id', (req, res) => {
    const filePath = "./user.json";
    fs.readFile(filePath, (err, data) => {
      try {
  
        if (err) console.log(err);
        if (data.length == 0) {
          res.send("No data")
        }
        else {
          let userdata = JSON.parse(data)
          let udata = userdata.find((user) =>
            user.id == req.params.id);
          res.render('studentfilecrud/deatils', { data: udata })
        }
      } catch (error) {
        res.write("Try again")
        return res.end()
      }
    })
  })
  module.exports = router