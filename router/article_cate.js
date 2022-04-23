const express = require('express')
const router = express.Router()
const expressJOI = require('@escook/express-joi')

const article_handler = require('../router_handler/article_cate.js')
const { name_alias_schema, id_schema, update_cate_schema } = require('../schema/article_cate.js')

router.get('/cates', article_handler.getCates)
router.post('/addcate', expressJOI(name_alias_schema), article_handler.addCate)
router.get('/deletecate/:id', expressJOI(id_schema), article_handler.deleteCateById)
//根据id获取文章分类的路由
router.get('/cates/:id', expressJOI(id_schema), article_handler.getCateById)
// 根据id更新文章分类的路由
router.post('/updatecate', expressJOI(update_cate_schema), article_handler.updateCate)

module.exports = router
