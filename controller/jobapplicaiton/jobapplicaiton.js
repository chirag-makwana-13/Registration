const express = require('express')
const router = express.Router()
const db = require('../../db')

// 1. form open url /home

router.get('/home', (req, res) => {
    res.render('jobapplication/application',{data:[[{}],[{},{}],[{}],[{}],[{},{},{}],[{},{},{},{}],[{}],[{}]]});
    // res.render('application',{data:''});
  })
  
  // 2. Insert data in database /form 
  
  router.post('/form', (req, res) => {
  
    // 2.0 Basic data
  
    try {
      console.log(req.body);
      let inquery = `insert into basic_details1 (f_name,l_name,designation,email,mobielnumber,address1,address2,city,state,zipcode,gender,reltionship_status,dob) values('${req.body.fname}','${req.body.lname}','${req.body.designation}','${req.body.email}','${req.body.pnumber}','${req.body.address1}','${req.body.address2}','${req.body.city}','${req.body.state}','${req.body.zipcode}','${req.body.gender}','${req.body.relationship}','${req.body.dob}')`;
      // console.log(inquery);
      db.query(inquery, function (error, result) {
        // if (error)
        // console.log(result.insertId);
        call(result.insertId)
        return res.end("Data insert successfully...");
      });
    } catch (error) {
      return res.write("Try again ")
    }
  
    function call(c_id) {
  
      // 2.1 Eduction form data 
  
      try {
        // console.log(req.body);
        let course_name = req.body.board
        let pyear = req.body.pyear
        let percantage = req.body.percentage
        let inquery;
        if(course_name[0]!=''){
          for (let i = 0; i < course_name.length; i++) {
            // console.log('ji');
            inquery = `insert into eduction_details2 (c_id,course_name,passing_year,percantage) values('${c_id}','${course_name[i]}','${pyear[i]}','${percantage[i]}')`;
            db.query(inquery, function (error, result) {
              if (error) throw error
              // res.end();
            });
          }
        }
        console.log(inquery);
      } catch (error) {
        return res.write("Try again ")
      }
  
      // 2.2 Work experience
  
      try {
        // console.log(req.body);
        let company1 = req.body.company1
        let company_designation1 = req.body.company_designation1
        let from1 = req.body.from1
        let to1 = req.body.to1
        let inquery;
        if(company1[0]!=''){
          for (let i = 0; i < company1.length; i++) {
            inquery = `insert into work_experience1 (c_id,company_name,company_designation,from_1,to_1 ) values('${c_id}','${company1[i]}','${company_designation1[i]}','${from1[i]}','${to1[i]}')`;
            console.log(inquery);
            db.query(inquery, function (error, result) {
              if (error) throw error
              // return res.send("Data print work...");
            });
          }
        }
      } catch (error) {
        return res.write("Try again ")
      }
  
      // 2.3 Lang known
  
      try {
        // console.log(req.body);
        let lang = req.body.lang;
        for (let i = 0; i < lang.length; i++) {
          inquery = `insert into language_known1 (c_id,l_name,l_read,l_write,l_speak ) values('${c_id}','${lang[i]}','${req.body[lang[i]][0] || ''}','${req.body[lang[i]][1] || ''}','${req.body[lang[i]][2] || ''}')`;
          // console.log(inquery);
          db.query(inquery, function (error, result) {
            if (error) throw error
          });
        }
        // for(let i=0;i<lang.length;i++){
        //   if(lang[i]=='hindi'){
        //     inquery = `insert into language_known1 (c_id,l_name,l_read,l_write,l_speak ) values('${c_id}','${lang[i]}','${req.body.hindi.includes('read')?'read':'no'}','${req.body.hindi.includes('write')?'write':'no'}','${req.body.hindi.includes('speack')?'speack':''}')`;
        //     // console.log(inquery);
        //     db.query(inquery, function (error, result) {
        //       if (error) throw error
        //     });
        //   }
        //   if(lang[i]=='gujarati'){
        //     inquery = `insert into language_known1 (c_id,l_name,l_read,l_write,l_speak ) values('${c_id}','${lang[i]}','${req.body.gujarati.includes('read')?'read':'no'}','${req.body.gujarati.includes('write')?'write':'no'}','${req.body.gujarati.includes('speack')?'speack':'no'}')`;
        //     // console.log(inquery);
        //     db.query(inquery, function (error, result) {
        //       if (error) throw error
        //     });
        //   }
        //   if(lang[i]=='english'){
        //     inquery = `insert into language_known1 (c_id,l_name,l_read,l_write,l_speak ) values('${c_id}','${lang[i]}','${req.body.english.includes('read')?'read':'no'}','${req.body.english.includes('write')?'write':'no'}','${req.body.english.includes('speack')?'speack':'no'}')`;
        //     // console.log(inquery);
        //     db.query(inquery, function (error, result) {
        //       if (error) throw error
        //     });
        //   }
        // }
      } catch (error) {
        return res.write("Try again ")
      }
  
      // 2.4 Technology
  
      try {
        // console.log(req.body);
        let tech = req.body.tech;
        for (let i = 0; i < tech.length; i++) {
          inquery = `insert into technology_known1 (c_id,t_name,t_level) values('${c_id}','${tech[i]}','${req.body[tech[i]]}')`;
          // console.log(inquery);
          db.query(inquery, function (error, result) {
            if (error) throw error
            // return res.send("Data print tech...");
          });
        }
        // for(let i = 0; i<tech.length;i++){
        //   if(tech[i]=='php'){
        //     inquery = `insert into technology_known1 (c_id,t_name,t_level) values('${c_id}','${tech[i]}','${req.body.phpb}')`;
        //     // console.log(inquery);
        //     db.query(inquery, function (error, result) {
        //       if (error) throw error
        //       // return res.send("Data print tech...");
        //     });
        //   }
        //   if(tech[i]=='java'){
        //     inquery = `insert into technology_known1 (c_id,t_name,t_level) values('${c_id}','${tech[i]}','${req.body.java}')`;
        //     // console.log(inquery);
        //     db.query(inquery, function (error, result) {
        //       if (error) throw error
        //       // return res.send("Data print tech...");
        //     });
        //   }
        //   if(tech[i]=='sql'){
        //     inquery = `insert into technology_known1 (c_id,t_name,t_level) values('${c_id}','${tech[i]}','${req.body.sql}')`;
        //     // console.log(inquery);
        //     db.query(inquery, function (error, result) {
        //       if (error) throw error
        //       // return res.send("Data print tech...");
        //     });
        //   }
        //   if(tech[i]=='oracle'){
        //     inquery = `insert into technology_known1 (c_id,t_name,t_level) values('${c_id}','${tech[i]}','${req.body.oracle}')`;
        //     // console.log(inquery);
        //     db.query(inquery, function (error, result) {
        //       if (error) throw error
        //       // return res.send("Data print tech...");
        //     });
        //   }
        // }
      } catch (error) {
        return res.write("Try again ")
      }
  
      // 2.5 Referance
  
      try {
        // console.log(req.body);
        console.log(req.body);
        let rname = req.body.rname
        let cnumber = req.body.cnumber
        let relation = req.body.relation
        let inquery;
        if (rname[0] != '') {
          for (let i = 0; i < rname.length; i++) {
            inquery = `insert into referance1 (c_id,r_name,r_number,r_relation ) values('${c_id}','${rname[i]}','${cnumber[i]}','${relation[i]}')`;
            console.log(inquery);
            db.query(inquery, function (error, result) {
              if (error) throw error
              // return res.send("Data print ref...");
            });
          }
        }
      } catch (error) {
        return res.write("Try again ")
      }
  
      // 2.6 Preferance
  
      try {
        // console.log(req.body.location);
        let inquery = `insert into preferance1 (c_id,p_location,notice_period,department,expected_ctc,current_ctc) values('${c_id}','${req.body.location}','${req.body.nperiod}','${req.body.department}','${req.body.ectc}','${req.body.cctc}')`;
        // console.log(inquery);
        db.query(inquery, function (error, result) {
          if (error) throw error
          // return res.send("Data print preferance...");
        });
      } catch (error) {
        return res.write("Try again ")
      }
    }
    })
  
      // 3. access data in database
  
    router.get('/form/:id',(req,res)=>{
      try{
        let data = `select * from basic_details1 where c_id = '${req.params.id}';select * from eduction_details2 where c_id = '${req.params.id}';select * from work_experience1 where c_id = '${req.params.id}';select * from referance1 where c_id = '${req.params.id}';select * from preferance1 where c_id = '${req.params.id}';select * from language_known1 where c_id = '${req.params.id}';select * from technology_known1 where c_id = '${req.params.id}'`
        // console.log(data);
        db.query(data, function (error, result) {
          res.render('jobapplication/application',{data:result})
          console.log(result);
        });
      }catch (error) {
        return res.write("Try again ")
      }
    })
    // 3.1  update data
    router.post('/update',(req,res)=>{
      // console.log(req.body.id);
      // value=" <%=basic[0] ? new Date(basic[0].dob).toISOString().split('T')[0] : ''%> "
      // value=" <%=basic[0] ? new Date(work_details[0].from_1).toISOString().split('T')[0] : ''%> ">
      // value=" <%=basic[0] ? new Date(work_details[0].to_1).toISOString().split('T')[0] : ''%> ">
      // 3.2 basic update    
      try{
        let data = `update basic_details1 set f_name = '${req.body.fname}',l_name = '${req.body.lname}',designation='${req.body.designation}',email='${req.body.email}',mobielnumber='${req.body.pnumber}',address1='${req.body.address1}',address2='${req.body.address2}',city='${req.body.city}',state='${req.body.state}',zipcode='${req.body.zipcode}',gender='${req.body.gender}',reltionship_status='${req.body.relationship}',dob='${req.body.dob}' where c_id='${req.body.id}' `
        // console.log(data);
        db.query(data, function (error, result) {
          // console.log(result);
          return res.end('Data update successfully...')
        });
      }catch (error) {
        return res.write("basic Try again ")
      }
      // 3.3 eduction update
      try {
        // console.log(req.body);
        let course_name = req.body.board
        let pyear = req.body.pyear
        let percantage = req.body.percentage
  
        // console.log('mhgmjh',req.body);
        let inquery;
        if(course_name[0]!=''){
          for (let i = 0; i < course_name.length; i++) {
            console.log('ji');
            inquery = `update eduction_details2 set course_name='${course_name[i]}',passing_year='${pyear[i]}',percantage='${percantage[i]}' where c_id=${req.body.id} and e_id=${req.body.edu_id[i]}`;
            console.log(inquery);
            db.query(inquery, function (error, result) {
              if (error) throw error
              console.log(result);
              // res.end();
            });
          }
        }
        console.log(inquery);
      } catch (error) {
        return res.write("edu Try again ")
      }
      // 3.4 work update
      try {
        // console.log(req.body);
        let company1 = req.body.company1
        let company_designation1 = req.body.company_designation1
        let from1 = req.body.from1
        let to1 = req.body.to1
        let inquery;
        if(company1[0]!=''){
          for (let i = 0; i < company1.length; i++) {
            inquery = `update work_experience1 set company_name ='${company1[i]}',company_designation='${company_designation1[i]}',from_1='${from1[i]}',to_1='${to1[i]}' where c_id='${req.body.id}'`;
            // console.log(inquery);
            db.query(inquery, function (error, result) {
              if (error) throw error
              // return res.send("Data print work...");
            });
          }
        }
      } catch (error) {
        return res.write("work Try again ")
      }
      // 3.5 language update
      try {
        // console.log(req.body);
        let lang = req.body.lang;
        for (let i = 0; i < lang.length; i++) {
          inquery = `update language_known1 set l_name='${lang[i]}',l_read='${req.body[lang[i]][0] || ''}',l_write='${req.body[lang[i]][1] || ''}',l_speak='${req.body[lang[i]][2] || ''}' where c_id='${req.body.id}' and l_name='${lang[i]}'`;
          // console.log(inquery);
          db.query(inquery, function (error, result) {
            if (error) throw error
          });
        }  } catch (error) {
          return res.write("lang Try again ")
        }
      // 3.6 technology update
      try {
        // console.log('chik+');
        let tech = req.body.tech;
        console.log(req.body.tech_id);
        for (let i = 0; i < tech.length; i++) {
          inquery = `update technology_known1 set t_name='${tech[i]}',t_level='${req.body[tech[i]]}' where c_id='${req.body.id}' and t_id = ${req.body.tech_id[i]}`;
          // console.log(inquery);
          db.query(inquery, function (error, result) {
            if (error) throw error
            // console.log("chi",result);
            // return res.send("Data print tech...");
          });
        }
      } catch (error) {
        return res.write("tech Try again ")
      }
      //3.7 refernace update
      try {
        // console.log(req.body);
        let rname = req.body.rname
        let cnumber = req.body.cnumber
        let relation = req.body.relation
        let inquery;
        if (rname[0] != '') {
          for (let i = 0; i < rname.length; i++) {
            inquery = `update referance1 set r_name='${rname[i]}',r_number='${cnumber[i]}',r_relation='${relation[i]}'where c_id='${req.body.id}'`;
            console.log(inquery);
            db.query(inquery, function (error, result) {
              if (error) throw error
              // console.log(result);
              // return res.send("Data print ref...");
            });
          }
        }
      } catch (error) {
        return res.write("ref Try again ")
      }
      //3.8 perefanace update
      try {
        let inquery = `update preferance1 set p_location='${req.body.location}',notice_period='${req.body.nperiod}',department='${req.body.department}',expected_ctc='${req.body.ectc}',current_ctc='${req.body.cctc}' where c_id='${req.body.id}'`;
        // console.log(inquery);
        db.query(inquery, function (error, result) {
          if (error) throw error
          // return res.send("Data print preferance...");
        });
      } catch (error) {
        return res.write("pere Try again ")
      }
    })
    module.exports = router