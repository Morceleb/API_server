//导入数据库操作对象
const db = require('../db/index.js')

exports.getCates = (req, res) => {
  const sqlGet = 'select * from ev_article_cate where is_delete = 0 order by id asc'
  db.query(sqlGet, (err, results) => {
    if (err) return res.cc(err)
    res.send({
      status: 0,
      msg: '获取文章分类数据成功！',
      data: results,
    })
  })
}

exports.addCate = (req, res) => {
  const sqlGet = 'select * from ev_article_cate where name=? or alias=?'
  db.query(sqlGet, [req.body.name, req.body.alias], (err, results) => {
    if (err) return res.cc(err)
    if (results.length === 2) return res.cc('类别名称或别名已存在！')
    if (results.length === 1 && req.body.name === results[0].name && req.body.alias === results[0].alias) return res.cc('类别名称或别名已存在！')
    if (results.length === 1 && req.body.name === results[0].name) return res.cc('类别名称已存在！')
    if (results.length === 1 && req.body.alias === results[0].alias) return res.cc('类别别名已存在！')
    const sqlInsert = 'insert into ev_article_cate set ?'
    db.query(sqlInsert, req.body, (err, results) => {
      if (err) return res.cc(err)
      if (results.affectedRows !== 1) return res.cc('新增类别失败！')
      res.cc('新增类别成功！', 0)
    })
  })
}

exports.deleteCateById = (req, res) => {
  const sqlUpdate = 'update ev_article_cate set is_delete=1 where id=?'
  db.query(sqlUpdate, req.params.id, (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('删除文章分类失败！！')
    res.cc('删除文章分类成功！', 0)
  })
}

exports.getCateById = (req, res) => {
  const sqlGet = 'select * from ev_article_cate where id=?'
  db.query(sqlGet, req.params.id, (err, results) => {
    if (err) return res.cc(err)
    if (results.length !== 1) return res.cc('获取文章分类数据失败，请检查id是否正确！')
    res.send({
      status: 0,
      msg: '获取文章分类数据成功！',
      data: results[0],
    })
  })
}

exports.updateCate = (req, res) => {
  const sqlGet = 'select * from ev_article_cate where id<>? and (name=? or alias=?)'
  db.query(sqlGet, [req.body.id, req.body.name, req.body.alias], (err, results) => {
    if (err) return res.cc(err)
    if (results.length === 2) return res.cc('文章分类名称和别名已存在，请修改后重试！！')
    if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) return res.cc('文章分类名称和别名已存在，请修改后重试！！')
    if (results.length === 1 && results[0].name === req.body.name) return res.cc('文章分类名称已存在，请修改后重试！！')
    if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('文章分类别名已存在，请修改后重试！！')

    //当查询结果没有冲突项时执行更新的sql语句^-^
    const sqlUpdate = 'update ev_article_cate set ? where id=?'
    db.query(sqlUpdate, [req.body, req.body.id], (err, results) => {
      if (err) return res.cc(err)
      if (results.affectedRows !== 1) return res.cc('更新文章分类失败，请稍后重试！！')
      res.cc('更新文章分类成功', 0)
    })
  })
}
