const express = require('express')
const router = express.Router()
const userInfoHandler = require('../router_handler/userinfo.js')

//导入验证规则的中间件
const expressJOI = require('@escook/express-joi')
const { id_nic_email_schema, oldOrNewPwd_schema, avatar_schema } = require('../schema/user.js')

//挂载用户页面的路由
router.get('/userinfo', userInfoHandler.getUserInfo)
router.post('/userinfo', expressJOI(id_nic_email_schema), userInfoHandler.updateUserInfo)
router.post('/updatepwd', expressJOI(oldOrNewPwd_schema), userInfoHandler.updatePassword)
router.post('/update/avatar', expressJOI(avatar_schema), userInfoHandler.updateAvatar)

module.exports = router
