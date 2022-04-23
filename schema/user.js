//导入定义验证规则的包
const joi = require('joi')

//定义用户名和密码的验证规则
const username = joi.string().alphanum().min(1).max(20).required()
const password = joi
  .string()
  .pattern(/^[\S]{6,25}$/)
  .required()

//定义id，nickname，email的验证规则
const id = joi.number().integer().min(1).required()
const nickname = joi.string().required()
const email = joi.string().email().required()

//向外导出用户名和密码的验证规则
exports.reg_login_schema = {
  body: {
    username,
    password,
  },
}

//向外导出id，nickname，email的验证规则
exports.id_nic_email_schema = {
  body: {
    id,
    nickname,
    email,
  },
}

//直接导出新旧密码的验证规则
exports.oldOrNewPwd_schema = {
  body: {
    oldPwd: password,
    newPwd: joi.not(joi.ref('oldPwd')).concat(password),
  },
}

//直接导出头像的验证规则
exports.avatar_schema = {
  body: {
    newAvatar: joi.string().dataUri().required(),
  },
}
