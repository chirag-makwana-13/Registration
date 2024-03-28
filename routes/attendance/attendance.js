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
    let field = req.query.orderby || 's_id'
    let orderdir = req.query.orderdir || 'asc'
    let month = req.query.month || '12';
    let who = 'allstudent';
    let query = `select student_50k.s_id , student_50k.fname, student_50k.lname, count(attendence_50k.attendence) as att , (count(attendence_50k.attendence)/(select count(distinct date) from attendence_50k where month(date) = '1'))*100 as pr from student_50k join attendence_50k where student_50k.s_id = attendence_50k.s_id and attendence_50k.attendence = "P" and MONTH(attendence_50k.date) =${month} group by student_50k.s_id,student_50k.fname order by ${field} ${orderdir} limit ${recotrdsperpage} offset ${start} ;`;
    // console.log(query);
    // console.log(month)
    let pquery = util.promisify(con.query).bind(con);
    let result = await pquery(query);
    // console.log(result);
    res.render('attendance/allstudent', { data: result, pageno: page, total: totalr, query: month, who: who });
});

// exam data with out promise

router.get('/exam', (req, res) => {
    try {
  
      let recotrdsperpage = 400;
      let totalr = 400;
      let query = `select student_50k.s_id , student_50k.fname as Name, sum(exam_50k.prilimias_mark_pr) as Practical,sum(exam_50k.prilimias_mark_th)as Theory,sum(exam_50k.terminal_mark_pr) as Practical_1 ,sum(exam_50k.terminal_mark_th)as Theory_1,sum(exam_50k.final_mark_pr) as Practical_2,sum(exam_50k.final_mark_th) as Theory_2 from student_50k join exam_50k where student_50k.s_id = exam_50k.s_id group by student_50k.s_id ;`;
      // console.log(query);
      // console.log(month)
      con.query(query, function (error, result) {
        if (error) throw error;
        res.render('attendance/exam', { data: result, total: totalr });
      });
    } catch (error) {
      res.write("Try again ")
      return res.end()
    }
});

router.get('/report/:studentid', (req, res) => {
    try {
      let totalr = 400;
      let studentid = req.params.studentid;
      let query = `select student_50k.s_id, student_50k.fname, student_50k.lname, exam_50k.subject_id , (prilimias_mark_pr+prilimias_mark_th) as Total_Prelim , (terminal_mark_pr+terminal_mark_th) as Total_Terminal , (final_mark_pr+final_mark_th) as Total_Final,(prilimias_mark_pr+prilimias_mark_th+terminal_mark_pr+terminal_mark_th+final_mark_pr+final_mark_th) as Total_Marks from exam_50k join student_50k where  exam_50k.s_id = student_50k.s_id and  exam_50k.s_id=${studentid} `;
      con.query(query, function (error, result) {
        if (error) throw error;
        res.render('attendance/report', { data: result, total: totalr });
      });
    } catch (error) {
      res.write("Try again ")
      return res.end()
    }
  });

// Search data

router.post('/search' ,(req, res)=>{
    try{
      let s_id = req.body.s_id || "1";
      let page = req.params.pageno || "1" ;
      if (page > 4 || page < 1) {
        res.end('Page is not found')
      }
      let recotrdsperpage = 50;
      let totalr = 200;
      // let totalp = totalr / recotrdsperpage;
      let start = page * recotrdsperpage - recotrdsperpage;
      // console.log(start);
      page = Number(page);
      let month = req.query.month || '12';
      let who = 'search';
      let query = `select student_50k.s_id , student_50k.fname, student_50k.lname,  count(attendence_50k.attendence) as att , (count(attendence_50k.attendence)/(select count(distinct date) from attendence_50k where month(date) = '1'))*100 as pr from student_50k join attendence_50k where student_50k.s_id = attendence_50k.s_id and attendence_50k.attendence = "P" and student_50k.s_id=${s_id} and MONTH(attendence_50k.date) =${month} group by student_50k.s_id limit ${recotrdsperpage} offset ${start} ;`;
      // console.log(month)
  
      con.query(query,(error,result)=>{
        if (error) throw error;
        res.render('attendance/allstudent', { data: result, pageno: page, total: totalr, query: month, who: who });
      })
      // console.log("query");
      // console.log(result);  
    }catch (error) {
      res.write("Try again ")
      return res.end()
    }
  })
  
  // Search filters
  
router.post('/searchfilters' ,(req, res)=>{
    try{
      let fname = req.body.fname;
      let lname = req.body.lname;
      let pr = req.body.pr;
      let type =req.body.type;
      let s_id = req.body.s_id;
      let page = req.params.pageno || "1" ;
      if (page > 4 || page < 1) {
        res.end('Page is not found')
      }
      let recotrdsperpage = 50;
      let totalr = 200;
      // let totalp = totalr / recotrdsperpage;
      let start = page * recotrdsperpage - recotrdsperpage;
      // console.log(start);
      page = Number(page);
      let month = req.query.month || '12';
      let who = 'search';
      let query ;
      // console.log(month)
      if(type=='and'){
        query = `select student_50k.s_id , student_50k.fname , student_50k.lname,  count(attendence_50k.attendence) as att , (count(attendence_50k.attendence)/(select count(distinct date) from attendence_50k))*100 as pr from student_50k join attendence_50k where student_50k.s_id = attendence_50k.s_id and attendence_50k.attendence = "P" and student_50k.fname= '${fname}' and student_50k.lname='${lname}' group by s_id having (count(attendence_50k.attendence)/(select count(distinct date) from attendence_50k))*100 >='${pr}';`
      }else{
        query = `select student_50k.s_id , student_50k.fname , student_50k.lname,  count(attendence_50k.attendence) as att , (count(attendence_50k.attendence)/(select count(distinct date) from attendence_50k))*100 as pr from student_50k join attendence_50k where student_50k.s_id = attendence_50k.s_id and attendence_50k.attendence = "P" and (student_50k.fname= '${fname}' or student_50k.lname='${lname}') group by s_id having (count(attendence_50k.attendence)/(select count(distinct date) from attendence_50k))*100 >='${pr}';`
      }
      con.query(query,(error,result)=>{
        if (error) throw error;
        res.render('attendance/allstudent', { data: result, pageno: page, total: totalr, query: month, who: who });
      })
      // console.log("query");
      // console.log(result);  
    }catch (error) {
      res.write("Try again ")
      return res.end()
    }
})


module.exports = router