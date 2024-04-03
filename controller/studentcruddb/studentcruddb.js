const db = require('../../db')
// 1. url type /duser/

const allstudent =  async (req, res) => {
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
    db.query(query, function (error, result) {
      if (error) throw error;
      res.render('studentcruddb/allstudent',{data: result , pageno: page , total: totalr});
    });
    // let pquery = util.promisify(db.query).bind(db);
    // let result = await pquery(query);
    // console.log(result);  
  };
  
  // 2. order by a data
const pagging =  async (req, res) => {
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
    db.query(query, function (error, result) {
      if (error) throw error;
      res.render('studentcruddb/allstudent',{data: result , pageno: page , total: totalr});
    });
    // let pquery = util.promisify(db.query).bind(db);
    // let result = await pquery(query);
    // console.log(result);  
  };
  module.exports = {allstudent,pagging}