const express = require('express')
const router = express.Router()

//导入各个路由规则的处理函数
const userHandler = require('../router_handler/user.js')
//导入用于验证用户名和密码的中间件
const expressJoi = require('@escook/express-joi')
//导入验证规则
const { reg_login_schema } = require('../schema/user.js')

//登录和路由的声明
router.post('/login', expressJoi(reg_login_schema), userHandler.login)
router.post('/register', expressJoi(reg_login_schema), userHandler.register)

//导出router对象
module.exports = router
