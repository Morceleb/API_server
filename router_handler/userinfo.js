const db = require('../db/index.js')
const bcrypt = require('bcryptjs')

const sqlGetInfo = 'select username,id,user_pic,email from ev_users where id=?'

exports.getUserInfo = (req, res) => {
  db.query(sqlGetInfo, req.user.id, (err, results) => {
    if (err) return res.cc(err)
    if (results.length !== 1) return res.cc('用户数据查询失败！')
    res.send({
      status: 0,
      msg: '查询成功',
      data: results[0],
    })
  })
}

exports.updateUserInfo = (req, res) => {
  const sqlUpdateInfo = 'update ev_users set ? where id=?'
  db.query(sqlUpdateInfo, [req.body, req.body.id], (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('更新用户数据失败！！')
    res.cc('更新用户数据成功！', 0)
  })
}

exports.updatePassword = (req, res) => {
  const sqlGetUser = 'select * from ev_users where id=?'
  db.query(sqlGetUser, req.user.id, (err, results) => {
    if (err) return res.cc(err)
    if (results.length !== 1) return res.cc('用户不存在！')

    //判断密码是否正确
    const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password)
    if (!compareResult) return res.cc('原密码错误！！！')
    const sqlUpdatePwd = 'update ev_users set password=? where id=?'
    db.query(sqlUpdatePwd, [bcrypt.hashSync(req.body.newPwd, 10), req.user.id], (err, nResults) => {
      if (err) return res.cc(err)
      if (nResults.affectedRows !== 1) return res.cc('修改失败！！请稍后再试！')
      res.cc('修改密码成功！', 0)
    })
  })
}

exports.updateAvatar = (req, res) => {
  const sqlUpdateAvatar = 'update ev_users set user_pic=? where id=?'
  db.query(sqlUpdateAvatar, [req.body.newAvatar, req.user.id], (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('更新失败！！请稍后再试！！')
    res.cc('更新头像成功', 0)
  })
}
