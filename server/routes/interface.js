var express = require('express');
var router = express.Router();
const mysql = require('mysql');
const md5 = require('../js/md5');



const conn = {
  host     : 'localhost',
  user     : 'root',
  password : '111111',
  database : 'cms'
}

router.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});


/* GET users listing. */
router.post('/login', function(req, res, next) {
  const uid = req.body.username;
  const pwd = req.body.password;
  // const uid = req.query.username;
  // const pwd = req.query.password;


  const pwdMD5 = md5(pwd);
  console.log(pwdMD5)
  var connection = mysql.createConnection(conn);
  connection.connect();


  new Promise(function (resolve, reject) {
    connection.query(`select * from admins where uid='${uid}' and pwd='${pwdMD5}'`,function (err,result) {
      if(err){
        reject({
          flag:false,
          msg:'服务器错误'
        })
      }else{
        if(result.length !== 0){
          req.session.userName = uid;
          resolve({
            flag:true,
          })
        }else{
          reject({
            flag:false,
            msg:'用户名或密码错误'
          })
        }
      }
    })

  }).then(function (result) {
    res.send(result);
  }).catch(function (err) {
    res.send(err);
  });

  connection.end();
});



module.exports = router;
