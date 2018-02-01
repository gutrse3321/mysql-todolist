const db = require('../config/db')
const todoModel = '../schema/list'
// 引入数据库
const TodolistDB = db.Todolist
const Todolist = TodolistDB.import(todoModel)

// 查询所有事项
const getTodolistById = async (id) => {
  const todolist = await Todolist.findAll({
    where: {
      UserID: id
    },
    // 只需返回这三个字段的结果即可
    attributes: ['ID', 'content', 'status']
  })
  return todolist
}

// 创建事项
const createTodolist = async (data) => {
  await Todolist.create({
    UserID: data.id,
    content: data.content,
    status: data.status
  })
  return true
}

// 删除事项
const removeTodolist = async (id, userId) => {
  const result = await Todolist.destroy({
    where: {
      ID: id,
      UserID: userId
    }
  })
  return result === 1
}

// 更新状态
const updateTodolist = async (id, userId, status) => {
  const result = await Todolist.update(
    {
      status
    },
    {
      where: {
        ID: id,
        UserID: userId
      }
    }
  )
  // 由于只更新一条目，所以只返回一个元素
  return result[0] === 1
}

module.exports = {
  getTodolistById,
  createTodolist,
  removeTodolist,
  updateTodolist
}
