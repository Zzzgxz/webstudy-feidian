var fs = require('fs')
var Student = require('./student')

//Express提供了一种更好的方式
//专门用来包装路由
 
var express = require('express')

var router = express.Router()



router.get('/', function(req,res){
    res.render('signup.html')
})

router.get('/students',function(req,res){
    Student.find(function(err,students){
        if(err){
            return res.status(500).send('server error')
        }
        res.render('list.html',{
            students:students
        })
    });
});

router.get('/students/new',function(req,res){
	res.render('new.html')
})

router.post('/students/new',function(req,res){
	//1.先获取表单数据
	//2.处理
	//   将数据保存到db.json这个文件中
	//3.发送响应
    //console.log(req.body)
    Student.save(req.body,function(err){
        if(err){
            return res.status(500).send('Server error.')
        }
        res.redirect('/students')
    })
})

router.get('/students/edit',function(req,res){

	Student.findById(parseInt(req.query.id),function(err,student){
        if(err){
            return res.status(500).send('Server error.')
        }
        res.render('edit.html',{
            student:student
        })
    })
})

router.post('/students/edit',function(req,res){
	Student.updateById(req.body,function(err){
        if(err){
            return res.status(500).send('Server error.')
        }
        res.redirect('/students')
    })
})

router.get('/students/delete',function(req,res){

    Student.deleteById(req.query.id,function(err){
        if(err){
            return res.status(500).send('Server error.')
        }
        res.redirect('/students')
    })
})

module.exports = router;
