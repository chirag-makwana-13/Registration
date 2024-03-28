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

router.get('/allstudent/:page', async (req, res) => {
    let { page } = req.params;
    if (page > 4 || page < 1) {
      res.end('Page is not found')
    }
    let recotrdsperpage = 50;
    let totalr = 200;
    // let totalp = totalr / recotrdsperpage;
    let start = page * recotrdsperpage - recotrdsperpage;
    page = Number(page);
    let month = req.query.month || '12';
    let who = 'allstudent';
    let query = `select student_50k.s_id , student_50k.fname, student_50k.lname,student_50k.email, student_50k.mobileno,student_50k.city from student_50k join attendence_50k where student_50k.s_id = attendence_50k.s_id group by student_50k.s_id,student_50k.fname`;
    // console.log(query);
    // console.log(month)
    let pquery = util.promisify(con.query).bind(con);
    let result = await pquery(query);
    // console.log(result);  
    res.render('delimeter/allstudent', { data: result, pageno: page, total: totalr, query: month, who: who });
  });

// find and delimeter type a data

router.post('/delimeter', (req,res)=>{
    try{
      let data = req.body.data;
      let deli = {'_':"fname",'^':"lname",'$':"email",'}':"city",':':"mobileno"};
      let key1;
      let result1 ={};
      let check = true;
      let deli2 = ['_','^','$','}',':'];
      for (let char of data){
        if(deli2.includes(char)){
          key1=char;
          check=true;
        }
        else {
          if (key1 in result1 && check){
            result1[key1] = (result1[key1] || '')+ ','+char;
          }
          else {
            result1[key1] = (result1[key1] || '')+char;
          }
          check=false;
        }
      }
      console.log(result1);
  
      // static query...
  
      // let dquery = `select * from student where student.fname like '%${result1['_']}%' or student.lname like '%${result1['^']}%' and student.email like '%${result1['$']}%' and student.city like '%${result1['}']}%' and student.mobileno like '%${result1[':']}%' `
      // console.log(dquery);
  
      let dquery = `select * from student where `;
      // console.log(dquery);
      let times = 1;
      for(let key in result1){
          if(deli.hasOwnProperty(key)){
              // result1[key] 
              if(result1[key].includes(',')){
                  times = 2;
                  let keyArr = result1[key].split(',');
                  // console.log(keyArr);
                      dquery = dquery + "( "
                      for(let i =0;i<keyArr.length;i++){
                        if(i == keyArr.length -1){
                          dquery = dquery + deli[key] + " like " + `'%${keyArr[i]}%'` + ")"
                          console.log(dquery);
                        }
                        else{
                          dquery = dquery + deli[key] + " like " + `'%${keyArr[i]}%'` +  " OR "
                        }
                      }
                    }
                    else{
                      if(times==1){
                        dquery = dquery + deli[key] + " like " + `'%${result1[key]}%'`
                        times = 2;
                        console.log(dquery);
                      }
                      else{
                        dquery = dquery + " AND " + deli[key] + " like " + `'%${result1[key]}%'`
                            console.log(dquery);
                      }
                    }
                  }
      } 
      con.query(dquery, function (error, result) {
        if (error) throw error;
        res.render('delimeter/allstudent', { data: result });
      });
    }catch (error) {
      res.write("Try again ")
      return res.end()
    } 
})

module.exports = router