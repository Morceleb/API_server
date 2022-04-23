//导入数据库操作对象
const db = require('../db/index.js')
//导入bcrypt
const bcrypt = require('bcryptjs')
//导入生成token的包
const jwt = require('jsonwebtoken')
//导入生成token的规则
const jwtConfig = require('../config')

//导出登录的处理函数
exports.login = (req, res) => {
  const userinfo = req.body
  const sqlStr = 'select * from ev_users where username=?'

  db.query(sqlStr, userinfo.username, (err, result) => {
    if (err) return res.cc(err)
    if (result.length !== 1) return res.cc('用户名不存在！')
    const compareResult = bcrypt.compareSync(userinfo.password, result[0].password)
    if (!compareResult) return res.cc('密码错误！')

    //获取用户信息，掩盖密码和头像
    const user = { ...result[0], password: '', user_pic: '' }
    const token = jwt.sign(user, jwtConfig.jwtSecret, { expiresIn: jwtConfig.exipreIn })
    res.send({
      status: 0,
      msg: '登录成功！',
      token: 'Bearer ' + token,
    })
  })
}
//导出注册的处理函数
exports.register = (req, res) => {
  const userinfo = req.body
  // if (!userinfo.username || !userinfo.password) {
  //   return res.cc('用户名不合法！！')
  // }

  //判断用户名是否被占用
  const sqlStr = 'select username from ev_users where username=?'
  db.query(sqlStr, userinfo.username, (err, result) => {
    if (err) return res.cc(err)
    if (result.length > 0) return res.cc('此用户名已存在！！')

    //使用bcrypt对用户的密码进行加密
    userinfo.password = bcrypt.hashSync(userinfo.password, 10)
    //注册新用户，写入用户数据到数据库
    const sql = 'insert into ev_users set?'
    db.query(sql, { username: userinfo.username, password: userinfo.password }, (err, result) => {
      if (err) return res.cc(err)
      if (result.affectedRows !== 1) return res.cc('注册失败，请稍后再试')
      res.cc('注册成功！', 0)
    })
  })
}
