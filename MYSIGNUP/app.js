var express = require('express')
var router =  require('./router')
var fs = require('fs')
var bodyParser = require('body-parser')

var app = express()

//添加css样式
app.use('/node_modules/',express.static('./node_modules/'))
app.use('/public/',express.static('./public/'))

app.engine('html',require('express-art-template'))


//配置模板引擎和body-parser 一定要挂在app.use(router)挂载路由之前
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//挂载路由
app.use(router) 

app.listen(3000,function(){
	console.log('running 3000...')
})


//app.js 入门模块
//职责：
//   创建服务
//   做一些相关配置
//   模板引擎
//   body-parser 解析表单 post 请求体
//   提供静态资源服务
//   挂在路由
//   监听端口启动服务



