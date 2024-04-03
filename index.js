const express = require('express')
const app = express()
const bodyParser = require("body-parser"); 
const path = require('path');
require("dotenv").config()
app.set('view engine', 'ejs');
app.use(express.json())
const localStorage = require('localStorage');
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(express.static(path.join(__dirname, 'public')))
const router =require("./router/routes")
app.use("/",router)

app.all("*", (req, res) => {
  res.send("Not found data in database... &#128560;")
})
app.listen(process.env.PORT, () => {
  console.log(`Server run on port ${process.env.PORT}`)
})
