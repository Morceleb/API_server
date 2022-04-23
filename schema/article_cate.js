//导入定义验证规则的包
const joi = require('joi')

const name = joi.string().required()
const alias = joi.string().alphanum().required()
const id = joi.number().integer().min(1).required()

exports.name_alias_schema = {
  body: {
    name,
    alias,
  },
}

exports.id_schema = {
  params: {
    id,
  },
}

exports.update_cate_schema = {
  body: {
    name,
    alias,
    id,
  },
}
