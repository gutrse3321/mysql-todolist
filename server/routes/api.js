// api 接口层
const todolist = require('../controllers/todolist')
const Router = require('koa-router')
const router = Router()

router
  .get('/todolist/:id', todolist.getTodolist)
  .post('/todolist', todolist.createTodolist)
  .delete('/todolist/:userId/:id', todolist.removeTodolist)
  .put('/todolist/:userId/:id/:status', todolist.updateTodolist)

module.exports = router
