const express = require('express')
const fs = require("fs");
const path = require('path');
const router = express.Router()
const util = require("util")
const db = require('../../db')
// 1. url type /duser/

router.get('/allstudent/:page', async (req, res) => {
    let {page} = req.params;
    if(page>250 || page< 1){
      res.end('Page is not found')
    }
    let recotrdsperpage = 200;
    let totalr = 50000;
    // let totalp = totalr / recotrdsperpage;
    let start = page * recotrdsperpage - recotrdsperpage;
    page = Number(page);
    let order = req.query.orderby || 's_id'
    let query = `select * from student_50k order by ${order} limit ${recotrdsperpage} offset ${start} ;`;
    let pquery = util.promisify(db.query).bind(db);
    let result = await pquery(query);
    // console.log(result);  
    res.render('studentcruddb/allstudent',{data: result , pageno: page , total: totalr});
  });
  
  router.get('/allstudent/:page/:field/:order', async (req, res) => {
    // console.log("Inside")
    let {page} = req.params;
    if(page>250 || page< 1){
      res.end('Page is not found')
    }
    let recotrdsperpage = 200;
    let totalr = 50000;
    // let totalp = totalr / recotrdsperpage;
    let start = page * recotrdsperpage - recotrdsperpage;
    page = Number(page);
    let field=req.params.field || 'fname';
    let order = req.params.order || 'asc';
    let query = `select * from student_50k order by ${field} ${order} limit ${recotrdsperpage} offset ${start}`;
    let pquery = util.promisify(db.query).bind(db);
    let result = await pquery(query);
    // console.log(result);  
    res.render('studentcruddb/allstudent',{data: result , pageno: page , total: totalr});
  });
  module.exports = router