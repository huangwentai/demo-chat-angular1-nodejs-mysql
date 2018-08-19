var router = require('express').Router();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

router.use(cookieParser())
router.use(session({
  secret: '12345',
  // name: 'name',
  // cookie: {maxAge: 60000},
  resave: false,
  saveUninitialized: true, 
}));

var urlencodedParser = bodyParser.urlencoded({ extended: false })
router.post('/login', urlencodedParser, function (req, res) {
    response = {
       loginId:req.body.loginId,
       password:req.body.password
    };
    client.query("select  * from user where loginId = '"+response.loginId+"'" , function(err, rows, fields){
        if (err){
            throw err;
            return;
        }
        if(rows){
            if (rows.length>0){
                if(rows[0].password==response.password){
                    req.session.loginId=rows[0].loginId;
                    req.session.name=rows[0].name;
                    data={
                        status:{
                            code:200,
                            msg:"登录成功"
                        },
                        data:{
                            
                        }
                    }
                    res.json(data);
                }
                else{
                    data={
                        status:{
                            code:201,
                            msg:"密碼不正確"
                        },
                        data:{
                            
                        }
                    }
                    res.json(data);
                }
            }else{
                data={
                    status:{
                        code:201,
                        msg:"賬號不存在"
                    },
                    data:{
                        
                    }
                }
                res.json(data);
            }
        }
    })
})
router.get('/session',function (req, res){
    res.json({loginId:req.session.loginId,name:req.session.name});
})
router.get('/logout',function (req, res){
    req.session.loginId = null;
    req.session.name = null;
    data={
        status:{
            code:200,
            msg:"賬號不存在"
        }
    }
    res.json(data);
})
module.exports = router;