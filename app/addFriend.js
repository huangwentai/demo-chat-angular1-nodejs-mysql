var router = require('express').Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
router.post('/searchUser', urlencodedParser, function (req, res) {
    loginId=req.session.loginId
    id=req.body.id;
    client.query("select a.loginId,a.name from user as a where (a.loginId like ? or a.name like ?) and a.loginId != ? and a.loginId not in (select friend_id from friend where my_id = ?)" ,["%"+id+"%","%"+id+"%",loginId,loginId], function(err, rows, fields){
        if (err){
            throw err;
            return;
        }
        data={
            status:{
                code:200,
                msg:"success"
            },
            data:rows
        }
        res.json(data);
    }) 
})
router.post('/addFriend', urlencodedParser, function (req, res) {
    id1=req.session.loginId;
    id2=req.body.id;
    client.query('insert into friend (my_id , friend_id , status) values (?,?,?)', [id2,id1,"1"], function (err,result){
        if (err){
            throw err;
            return;
        }
        if(result){
            client.query('insert into friend (my_id , friend_id , status) values (?,?,?)', [id1,id2,"1"] , function (err,result){
                if (err){
                    throw err;
                    return ;
                }else{
                    if(result){
                        data={
                            status:{
                                code:200,
                                msg:"添加成功"
                            },
                            data:{

                            }
                        }
                        res.json(data);
                    }else{
                        data={
                            status:{
                                code:201,
                                msg:"添加失敗"
                            },
                            data:{

                            }
                        }
                        res.json(data);
                    }
                }
            });
        }else{
            data={
                status:{
                    code:201,
                    msg:"添加失敗"
                },
                data:{

                }
            }
            res.json(data);
        }
    }) 
})
router.get('/friendList', function (req, res) {
    loginId=req.session.loginId
    client.query("select a.loginId,a.name from user as a where a.loginId in (select friend_id from friend where my_id = ?)" ,[loginId], function(err, rows, fields){
        if (err){
            throw err;
            return;
        }
        data={
            status:{
                code:200,
                msg:"success"
            },
            data:rows
        }
        res.json(data);
    }) 
})
module.exports = router;