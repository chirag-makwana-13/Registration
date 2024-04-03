const express = require('express')
const fs = require("fs");
const path = require('path');
const router = express.Router()
const util = require("util")
const con = require('../../db')
const mysql = require("mysql")
const bodyParser = require("body-parser");  
router.use(bodyParser.urlencoded({
  extended: true
}))

// dynamic code run

router.get('/', (req, res) => {
    res.render('grid/insert');
  });
  
  router.all('/dynamic/:pageno?', (req, res) => {
    try {
      let recotrdsperpage = 50;
      let totalr = 1200;
      let pageno = req.params.pageno || "1";
      let start = pageno * recotrdsperpage - recotrdsperpage;
      let totalp = totalr / recotrdsperpage;
      let field = req.query.orderby || 's_id'
      let orderdir = req.query.orderdir || 'asc'
      pageno = Number(pageno);
      if (pageno > totalp || pageno < 1) {
        res.end('Page is not found')
      }
      let who = 'dynamic';
      let query;
      let tempquery;
      if (req.method == "POST") {
        tempquery = req.body.query;
        query = tempquery;
      } else {
        tempquery = req.query.query;
        query = tempquery
      }
      // tempquery += ` order by ${field}, ${orderdir}`
      if (!query.split('limit')[1]) {
        query += ` limit ${start},${recotrdsperpage};`
      }
      con.query(query, function (error, result) {
        if (error) {
          res.send("Invalid Query...")
          // throw error;
        } else {
          res.render('grid/dynamic', { data: result, pageno: pageno, total: totalr, totalp: totalp, query: tempquery, who: who });
        }
      });
    } catch (error) {
      res.write("Try again ")
      return res.end()
    }
  });



module.exports = router