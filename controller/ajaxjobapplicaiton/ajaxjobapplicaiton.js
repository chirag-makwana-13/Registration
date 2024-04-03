const express = require('express')
const router = express.Router()
const db = require('../../db')

// city change  
router.get('/city', (req, res) => {
    try {
        let state = req.query.state_id;
        // console.log(state);
        let inquery = `select * from city where state_id = '${state}' `
        db.query(inquery, function (error, result) {
            // if (error)
            res.json({ 'result': result })
        });
    } catch (error) {
        return res.write("Try again ")
    }
})
// 1. form open url /home

router.get('/home', (req, res) => {
    res.render('ajaxjobapplicaiton/application', { data: [[{}], [{}, {}], [{}], [{}], [{}, {}, {}], [{}, {}, {}, {}], [{}], [{}]], mode: 'insert' });
    // res.render('application',{data:''});
})

// 3. access data in database

router.get('/form/:id', (req, res) => {
    try {
        let data = `select * from basic_details1 where c_id = '${req.params.id}';select * from eduction_details2 where c_id = '${req.params.id}';select * from work_experience1 where c_id = '${req.params.id}';select * from referance1 where c_id = '${req.params.id}';select * from preferance1 where c_id = '${req.params.id}';select * from language_known1 where c_id = '${req.params.id}';select * from technology_known1 where c_id = '${req.params.id}'`
        // console.log(data);
        db.query(data, function (error, result) {
            res.render('ajaxjobapplicaiton/application', { data: result, mode: 'update' })
            // console.log(result);
        });
    } catch (error) {
        return res.write("Try again ")
    }
})
//........................ *****AJAX insert******..........................

router.get('/home/:id', (req, res) => {
    try {
        let data = `select * from basic_details1 where c_id = '${req.params.id}';select * from eduction_details2 where c_id = '${req.params.id}';select * from work_experience1 where c_id = '${req.params.id}';select * from referance1 where c_id = '${req.params.id}';select * from preferance1 where c_id = '${req.params.id}';select * from language_known1 where c_id = '${req.params.id}';select * from technology_known1 where c_id = '${req.params.id}'`
        // console.log(data);
        db.query(data, function (error, result) {
            res.render('ajaxjobapplicaiton/application', { data: result, mode: 'update' })
            // console.log(result);
        });
    } catch (error) {
        return res.write("Try again ")
    }
})
// basic insert
router.post('/basic', (req, res) => {
    try {
        console.log(req.body);
        let inquery = `insert into basic_details1 (f_name,l_name,designation,email,mobielnumber,address1,address2,city,state,zipcode,gender,reltionship_status,dob) values('${req.body.fname}','${req.body.lname}','${req.body.designation}','${req.body.email}','${req.body.pnumber}','${req.body.address1}','${req.body.address2}','${req.body.city}','${req.body.state}','${req.body.zipcode}','${req.body.gender}','${req.body.relationship}','${req.body.dob}')`;
        console.log(inquery);
        db.query(inquery, function (error, result) {
            // if (error)
            // console.log("error:"+error);
            // console.log(result.insertId);
            res.json({ 'c_id': result.insertId })
            // console.log(error+result);
            // return res.end("Data insert successfully...");
        });
    } catch (error) {
        return res.write("Try again ")
    }
})
//eduction insert
router.post('/eduction', (req, res) => {

    try {
        // console.log(req.body);
        let c_id = req.body.c_id
        let course_name = req.body.board
        let pyear = req.body.pyear1
        let percantage = req.body.percentage
        let inquery;
        // console.log('ji');`
        if (course_name[0] != '') {
            for (let i = 0; i < course_name.length; i++) {
                // console.log('ji');
                inquery = `insert into eduction_details2 (c_id,course_name,passing_year,percantage) values('${c_id}','${course_name[i]}','${pyear[i]}','${percantage[i]}')`;
                console.log(inquery);
                db.query(inquery, function (error, result) {
                    if (error) throw error
                    // res.end();
                });
            }
        }
    } catch (error) {
        return res.write("Try again ")
    }
})
//work insert
router.post('/work', (req, res) => {

    try {
        // console.log(req.body);
        let company1 = req.body.company1
        let company_designation1 = req.body.company_designation1
        let from1 = req.body.from1
        let to1 = req.body.to1
        let inquery;
        if (company1[0] != '') {
            for (let i = 0; i < company1.length; i++) {
                inquery = `insert into work_experience1 (c_id,company_name,company_designation,from_1,to_1 ) values('${req.body.c_id}','${company1[i]}','${company_designation1[i]}','${from1[i]}','${to1[i]}')`;
                // console.log(inquery);
                db.query(inquery, function (error, result) {
                    if (error) throw error
                    // return res.send("Data print work...");
                });
            }
        }
    } catch (error) {
        return res.write("Try again ")
    }
})
// lang insert
router.post('/language', (req, res) => {
    try {
        // console.log(req.body);
        // let lang = req.body.language;
        // console.log(req.body.hindi);
        let inquery = `insert into language_known1 (c_id,l_name,l_read,l_write,l_speak ) values('${req.body.c_id}','${req.body.hindi}','${req.body.hindiread}','${req.body.hindiwrite}','${req.body.hindispeack}'),('${req.body.c_id}','${req.body.guj}','${req.body.gujread}','${req.body.gujwrite}','${req.body.gujspeack}'),('${req.body.c_id}','${req.body.eng}','${req.body.engread}','${req.body.engwrite}','${req.body.engspeack}')`;
        // console.log(inquery);
        db.query(inquery, function (error, result) {
            if (error) throw error
            // console.log(result);
        });

    } catch (error) {
        return res.write("Try again ")
    }
})
//tech insert
router.post('/technology', (req, res) => {
    try {
        // console.log(req.body);
        let tech = req.body.tech;
        for (let i = 0; i < tech.length; i++) {
            inquery = `insert into technology_known1 (c_id,t_name,t_level) values('${req.body.c_id}','${tech[i]}','${req.body[tech[i]]}')`;
            // console.log(inquery);
            db.query(inquery, function (error, result) {
                if (error) throw error
                // return res.send("Data print tech...");
            });
        }
    } catch (error) {
        return res.write("Try again ")
    }
})
//referance
router.post('/referance1', (req, res) => {
    try {
        let inquery = `insert into referance1 (c_id,r_name,r_number,r_relation ) values('${req.body.c_id}','${req.body.rname}','${req.body.cnumber}','${req.body.relation}')`;
        // console.log(inquery);
        db.query(inquery, function (error, result) {
            if (error) throw error
            // return res.send("Data print ref...");
        });
    } catch (error) {
        return res.write("Try again ")
    }
})
// preferance
router.post('/preferance1', (req, res) => {
    try {
        let inquery = `insert into preferance1 (c_id,p_location,notice_period,department,expected_ctc,current_ctc) values('${req.body.c_id}','${req.body.plocation}','${req.body.nperiod}','${req.body.dep}','${req.body.ectc}','${req.body.cctc}')`;
        // console.log(inquery);
        db.query(inquery, function (error, result) {
            if (error) throw error
            // return res.send("Data print preferance...");
        });
    } catch (error) {
        return res.write("Try again ")
    }
})

//............................*************Update**********......................................

//basic update
router.post('/updatebasic', (req, res) => {
    try {
        // console.log(req.body);
        let data = `update basic_details1 set f_name = '${req.body.fname}',l_name = '${req.body.lname}',designation='${req.body.designation}',email='${req.body.email}',mobielnumber='${req.body.pnumber}',address1='${req.body.address1}',address2='${req.body.address2}',city='${req.body.city}',state='${req.body.state}',zipcode='${req.body.zipcode}',gender='${req.body.gender}',reltionship_status='${req.body.relationship}',dob='${req.body.dob}' where c_id='${req.body.c_id}' `
        // console.log(data);
        db.query(data, function (error, result) {
            // console.log(result);
            return res.end('Data update successfully...')
        });
    } catch (error) {
        return res.write("basic Try again ")
    }
})
// eduction update
router.post('/updateeduction', (req, res) => {
    try {
        // console.log(req.body);
        let course_name = req.body.board
        let pyear1 = req.body.pyear1
        let percentage = req.body.percentage

        // console.log('mhgmjh',req.body);
        let inquery;
        if (course_name[0] != '') {
            for (let i = 0; i < course_name.length; i++) {
                // console.log('ji', req.body.edu_id[0]);
                inquery = `update eduction_details2 set course_name='${course_name[i]}',passing_year='${pyear1[i]}',percantage='${percentage[i]}' where c_id=${req.body.c_id} and e_id=${req.body.edu_id[i]}`;
                console.log(inquery);
                db.query(inquery, function (error, result) {
                    if (error) throw error
                    // console.log(result);
                    // res.end();
                });
            }
        }
        console.log(inquery);
    } catch (error) {
        return res.write("edu Try again ")
    }
})
// work update
router.post('/updatework', (req, res) => {
    try {
        // console.log(req.body);
        let company1 = req.body.company1
        let company_designation1 = req.body.company_designation1
        let from1 = req.body.from1
        let to1 = req.body.to1
        let inquery;
        if (company1[0] != '') {
            for (let i = 0; i < company1.length; i++) {
                inquery = `update work_experience1 set company_name ='${company1[i]}',company_designation='${company_designation1[i]}',from_1='${from1[i]}',to_1='${to1[i]}' where c_id='${req.body.c_id}'`;
                // console.log('hii');
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
})
//refernace
router.post('/updatereferance1', (req, res) => {
    try {
        // console.log(req.body);
        let rname = req.body.rname
        let cnumber = req.body.cnumber
        let relation = req.body.relation
        let inquery;
        if (rname[0] != '') {
            for (let i = 0; i < rname.length; i++) {
                inquery = `update referance1 set r_name='${rname[i]}',r_number='${cnumber[i]}',r_relation='${relation[i]}'where c_id='${req.body.c_id}'`;
                // console.log(inquery);
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
})
//preferance 
router.post('/updatepreferance1', (req, res) => {
    try {
        let inquery = `update preferance1 set p_location='${req.body.plocation}',notice_period='${req.body.nperiod}',department='${req.body.department}',expected_ctc='${req.body.ectc}',current_ctc='${req.body.cctc}' where c_id='${req.body.c_id}'`;
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