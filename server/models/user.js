const db = require('../config/db')
// 引入user表结构
const userModel = '../schema/user'
// 引入数据库
const TodoListDB = db.Todolist
// 用sequelize的import方法引入表结构
// 实例化User
const User = TodoListDB.import(userModel)

// 通过id查询一个用户
// 对于需要等待promise结果的函数需要async await
const getUserById = async (id) => {
  // 用await控制异步操作
  // 将返回的Promise对象的数据返回出来
  // 实现了 同步 的写法，异步 的IO操作
  const userInfo = await User.findOne({
    where: {
      ID: id
    }
  })

  return userInfo
}

// 通过用户名查询一个用户
const getUserByName = async (name) => {
  const userInfo = await User.findOne({
    where: {
      UserName: name
    }
  })

  return userInfo
}

// 导出方法，在controller里调用
module.exports = {
  getUserById,
  getUserByName
}
