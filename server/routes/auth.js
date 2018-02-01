// auth 接口层
const User = require('../controllers/user')
const Router = require('koa-router')
const router = Router()

// 定义url的参数是id
router
  .get('/user/:id', User.getUserInfo)
  .post('/user', User.postUserAuth)

module.exports = router
