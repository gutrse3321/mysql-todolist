const user = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

// 用户模块
class UserController {
  static async getUserInfo(ctx) {
    // 获取url里船过来的参数里的id
    const id = ctx.params.id
    // 通过await 同步 返回查询结果
    const result = await user.getUserById(id)
    // 请求的结果放在body
    ctx.body = result
  }
  
  static async postUserAuth(ctx) {
    // post过来的数据存在request.body里
    const data = ctx.request.body
    const userInfo = await user.getUserByName(data.name)
    // 如果查无此用户返回null
    if (userInfo !== null) {
      if (!bcrypt.compareSync(data.password, userInfo.Password)) {
        // success标志位是方便前端判断返回是否正确
        this.body = {
          success: false,
          info: '密码错误'
        }
      } else {
        const userToken = {
          name: userInfo.UserName,
          id: userInfo.ID
        }
        // 指定密钥
        const secret = 'mysql-todolist'
        // 签发token
        const token = jwt.sign(userToken, secret)
        ctx.body = {
          success: true,
          token: token
        }
      }
    } else {
      ctx.body = {
        success: false,
        info: '用户不存在'
      }
    }
  }
}

module.exports = UserController
