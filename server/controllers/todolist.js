const todolist = require('../models/todolist')

class TodoListController {
  static async getTodolist(ctx) {
    // 从url里获取参数
    const id = ctx.params.id
    const result = await todolist.getTodolistById(id)
    ctx.body = {
      success: true,
      result
    }
  }
  
  static async createTodolist(ctx) {
    const data = ctx.request.body
    const success = await todolist.createTodolist(data)
    ctx.body = {
      success
    }
  }
  
  static async removeTodolist(ctx) {
    const ID = ctx.params.id
    const UserID = ctx.params.userId
    console.log(ID + ' ' + UserID)
    const result = await todolist.removeTodolist(ID, UserID)
  
    ctx.body = {
      success: true
    }
  }
  
  static async updateTodolist(ctx) {
    const ID = ctx.params.id
    const UserID = ctx.params.userId
    let status = ctx.params.status
    // 状态更新
    status === '0' ? status = true : status = false
  
    const result = await todolist.updateTodolist(ID, UserID, status)
  
    ctx.body = {
      success: true
    }
  }
}

module.exports = TodoListController
