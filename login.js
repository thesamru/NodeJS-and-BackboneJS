var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mysql = require('mysql');
var cookieParser = require('cookie-parser');
var moment = require('moment');
var SHA1 = require('sha1');
var session = require('express-session')
app.use(session({secret: 'ssshhhhh'}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('./client'));

app.use(bodyParser.json());

var connection = mysql.createConnection({
     host: "localhost",
     user: "root",
     password: "root",
     database: "ved"   
    });

app.post('/login',function(req,res){


    var email = req.body.email;
    var pass =  req.body.password;
    connection.query('select * from User where (email_id,password) = (?,?) ',[email,SHA1(pass)],function(err,rows){
      if(err) throw err;
      else {
            console.log(rows);
            if(rows.length === 0)
           {
              res.send({name : 0});
           }
           else{
              var s_id = req.session.id;
              var id = rows[0].Uid;
              var now = moment();
              var time = now.format('YYYY-MM-DD HH:mm:ss');
              var post = {session_id : s_id, user_id : id, TS : time};
              connection.query('insert into User_Session set ?', post, function(err,result){
                  if(err){
                     console.log(err);
                }
                  else{
                       res.send({name : 1, u_id : id, se_id : s_id});
                       console.log('Working');
                  }
            });
            }
      }
});

});
app.post('/task',function(req,res){
     var sess = req.body.sessionid;
     var arr = [];
     connection.query('select * from User_Session where session_id = ? ',[sess],function(err,rows){
     if(err){
           console.log(err);
     }
     else {
     if(rows.length != 0)
     {
     var ss = rows[0].user_id;
     connection.query(' select * from daily_task where uid = ? ',[ss],function(err,rows1){
        if(err){
          console.log(err);
         }
        else{
           if(rows.length == 0)
             {
                res.send({name : 0});
                console.log("not exists");
             }
           else
            {
          connection.query('select * from User where Uid = ? ',[ss],function(err,rows){
            if(err){
              console.log(err);
            }
            else {
          var i;
          var name = rows[0].first_name + ' ' + rows[0].last_name;
          for(i=0;i<Object.keys(rows1).length;i++)
          {   
             var obj = { uname : name, uid : rows1[i].uid, task : rows1[i].task, time : rows1[i].Time_taken, pendingtask : rows1[i].pending_task, comment : rows1[i].comment, date : rows1[i].time};
             arr.push(obj);
          }  
         res.send({name : 1, result : arr, });
       }
       });
         //console.log(arr);
       }

     }
        
    });
   }
 }
});  
});

app.post('/profile',function(req,res){
    var sess = req.body.sessionid;
    console.log(sess);
    connection.query('select * from User_Session where session_id = ? ',[sess],function(err,rows){
      if(err){
        console.log(err);
      }
      else{
      var uid = rows[0].user_id;
      console.log(uid);
      connection.query('select * from User where Uid = ? ',[uid],function(err,rows){
        res.send({username : rows[0].user_name, firstname : rows[0].first_name, lastname : rows[0].last_name, email : rows[0].email_id, alteremail : rows[0].alt_email_id, empid : rows[0].Uid, mobileno : rows[0].mobile_num, altermobileno : rows[0].alt_mobile_num});
      });
    }
    });
});

app.post('/updatetask',function(req,res){
    var pendingtask = req.body.pendingtask;
    var timetaken = req.body.time1;
    var task = req.body.task;
    var date = req.body.date;
    var uid;
    var time = req.body.date;
    console.log(time);
    connection.query('select * from User_Session where session_id = ? ',[req.body.sessionid],function(err,rows){
     if(err)
     {
      console.log(err);
     }
     else{
       console.log(req.body.sessionid);
       uid = rows[0].user_id;
       //console.log(uid);
       var sql = "INSERT INTO daily_task (uid,task,Time_taken, pending_task,comment,time) VALUES (?,?,?,?,?,?)";
    //var values = [uid,task,timetaken,pendingtask,'',time];
      //console.log(uid);
      connection.query(sql,[uid,task,timetaken,pendingtask,'',time],function(err,rows){
        if(err){
        console.log('err');
        }
        else{
        res.send({result : 'success'});
        }
     });
     }
    });
    
});

app.post('/signup',function(req,res){
  var fname = req.body.firstname;
  var lname = req.body.lastname;
  var email = req.body.email;
  var empid = req.body.empid;
  var aemail = req.body.alteremail;
  var pwd = req.body.password;
  var mobile = req.body.mobileno;
  var username = req.body.username;
  var altermobile = req.body.altermobileno;
  var sql = "insert into User (Uid,first_name,last_name,email_id,alt_email_id,user_name,password,mobile_num,alt_mobile_num,allow_mul_login ) values (?,?,?,?,?,?,?,?,?,?)"
  connection.query(sql,[empid,fname,lname,email,aemail,username,SHA1(pwd),mobile,altermobile,0],function(err,rows){
    if(err){
      console.log(err);
    }
    else{
      console.log('successfully inserted ');
      res.send({result : 'success'});
    }
  }); 
});

app.post('/logout',function(req,res){
    var sess = req.body.sessionid;
    connection.query(' delete from User_Session where session_id = ? ',[sess],function(err,rows){
       if(err){
          console.log(err);
       }
       else {
            console.log('record has been successfully deleted');
            res.send({logout : 'yes'});
      }
   });
});

app.listen(4000,function(){
  console.log('server is running on port 4000');
});




