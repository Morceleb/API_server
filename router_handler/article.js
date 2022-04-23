const path = require('path')
const db = require('../db/index.js')
exports.addArticle = (req, res) => {
  if (!req.file || req.file.fieldname !== 'cover_img') return res.cc('新增文章失败，文章封面为必选参数！！')
  //重新封装文章信息
  const articleInfo = {
    ...req.body,
    cover_img: path.join(__dirname, req.file.filename),
    pub_date: new Date(),
    author_id: req.user.id,
  }

  const sqlInsert = 'insert into ev_articles set?'
  db.query(sqlInsert, articleInfo, (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('发布文章失败，请稍后重试！！')
    res.cc('发布文章成功！', 0)
  })
}
