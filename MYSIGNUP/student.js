//数据操作文件模块
//只处理数据，不关心业务
var fs = require('fs')
var dbPath = './db.json'

//获取学生列表

exports.find = function(callback){
	fs.readFile(dbPath,'utf8',function(err,data){
		if(err){
			return callback(err)
		}
		callback(null,JSON.parse(data).students)
	}) 
}

//根据id获取学生信息对象
exports.findById = function(id,callback){
    fs.readFile(dbPath,'utf8',function(err,data){
        if(err){
            return callback(err)
        }
        var students = JSON.parse(data).students
        var ret = students.find(function(item){
            return item.id === parseInt(id)
        })
        callback(null,ret)
    })
   
}

//保存学生

exports.save = function(student,callback){
	fs.readFile(dbPath,'utf8',function(err,data){
		if(err){
			return callback(err)
		}
		var students = JSON.parse(data).students

        //处理 id 唯一的不重复
        student.id = students[students.length - 1].id + 1


        //把用户数据存到数组中
        students.push(student)

        //把对象数据转换为字符串
        var fileData = JSON.stringify({
        	students: students
        })

        //把字符串保存到文件中
        fs.writeFile(dbPath,fileData,function(err){
        	if(err){
        		return callback(err)
        	}
        	//成功就没错，所以错误对象是 null
            callback(null)
        })
	})
}


//更新学生

exports.updateById = function(student,callback){
	fs.readFile(dbPath,'utf8',function(err,data){
        if(err){
            return callback(err)
        }
        var students = JSON.parse(data).students

        student.id = parseInt(student.id)

        //修改谁就需要把谁找出来

        var stu = students.find(function(item){
            return item.id === parseInt(student.id)
        })

        for(var key in student){
            stu[key] = student[key]
        }

        var fileData = JSON.stringify({
            students:students
        })

        fs.writeFile(dbPath,fileData,function(err){
            if(err){
                return callback(err)
            }

            callback(null)
        })

    })
}

//删除学生

exports.deleteById = function(id,callback){
    fs.readFile(dbPath,'utf8',function(err,data){
        if(err){
            return callback(err)
        }
        var students = JSON.parse(data).students

        //findIndex  方法专门用来根据条件查找元素下标
        var deleteId = students.findIndex(function(item){
            return item.id === parseInt(id)
        })

        students.splice(deleteId,1)

        var fileData = JSON.stringify({
            students:students
        })

        fs.writeFile(dbPath,fileData,function(err){
            if(err){
                return callback(err)
            }
            callback(null)
        })

    })
}