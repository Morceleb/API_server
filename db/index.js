const mysql = require('mysql')

///创建连接池实例对象
const db = mysql.createPool({
  host: '127.0.0.1',
  port: '3306',
  user: 'root',
  password: '202506',
  database: 'my_db_01',
})

// db.query('select 1', (err, res) => {
//   if (err) return console.log(err.message)
//   console.log(res)
// })

module.exports = db
