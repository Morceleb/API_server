const express = require('express')
const router = express.Router()

//导入用于解析form-data数据的中间件
const multer = require('multer')
const path = require('path')
//导入验证表单数据格式的中间件
const expressJOI = require('@escook/express-joi')
const { addArticle } = require('../schema/article.js')

//创建multer的实例对象，通过dest属性指定文件的存放路径
const upload = multer({ dest: path.join(__dirname, '../uploads') })

const articleHandler = require('../router_handler/article.js')

router.post('/add', upload.single('cover_img'), expressJOI(addArticle), articleHandler.addArticle)

module.exports = router
