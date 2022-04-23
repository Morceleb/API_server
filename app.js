//导入并配置express
const express = require('express')
const app = express()

//导入并配置cors
const cors = require('cors')
app.use(cors())

//导入用于定义验证规则的中间件
const joi = require('joi')

//导入用于解析token的中间件
const jwt = require('express-jwt')
const config = require('./config.js')

//注册用于解析urlencoded数据的中间件
app.use(express.urlencoded({ extended: false }))

//封装信息发送中间件
app.use((req, res, next) => {
  res.cc = (err, status = 1) => {
    res.send({
      status,
      msg: err instanceof Error ? err.message : err,
    })
  }

  next()
})

//在路由之前注册解析token的中间件
app.use(jwt({ secret: config.jwtSecret, algorithms: ['HS256'] }).unless({ path: [/^\/api/] }))

//将upload文件夹下的文件挂载为服务器的静态资源库
app.use('/uploads', express.static('./uploads'))

//导入并注册userRouter路由
const userRouter = require('./router/user.js')
app.use('/api', userRouter)
//导入并注册userInfo路由
const userInfoR = require('./router/userinfo.js')
app.use('/my', userInfoR)
//导入并注册文章列表相关的路由
const artCatR = require('./router/article_cate.js')
app.use('/my/articles', artCatR)
//导入并注册文章相关的路由
const articleR = require('./router/article.js')
app.use('/my/articles', articleR)

app.use((err, req, res, next) => {
  //验证失败导致的错误
  if (err instanceof joi.ValidationError) return res.cc(err)
  if (err.name === 'UnauthorizedError') return res.cc('身份验证失败！')
  //其他未知错误
  res.cc(err)
})

app.listen(8080, () => {
  console.log('api server is running at http://127.0.0.1:8080')
})
