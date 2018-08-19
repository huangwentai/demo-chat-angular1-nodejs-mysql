var router = require('express').Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
router.post('/register', urlencodedParser, function (req, res) {
    response = {
       loginId:req.body.loginId,
       password:req.body.password,
       name:req.body.name,
    };
    client.query("select  * from user where loginId = '"+response.loginId+"'" , function(err, rows, fields){
        if (err){
            throw err;
            return;
        }
        if(rows){
            if (rows.length>0){
                data={
                    status:{
                        code:201,
                        msg:"賬號已存在"
                    },
                    data:{
                        
                    }
                }
                res.json(data);
            }else{
                client.query('insert into user (loginId , name ,password) values (?,?,?)', [response.loginId,response.name,response.password] , function (err,result){
                    if (err){
                        throw err;
                        return ;
                    }else{
                        if(result){
                            console.log(result);
                        }
                        data={
                            status:{
                                code:200,
                                msg:"注册成功"
                            },
                            data:{

                            }
                        }
                        res.json(data);
                        return;
                    }
                });
            }
        }
    }) 
})
module.exports = router;