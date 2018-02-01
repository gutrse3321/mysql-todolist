# mysql-todolist
## 开始
入门小项目,简单熟悉摸下windows端git bush
## 感谢学习项目
* [Molunerfinn/vue-koa-demo](https://github.com/Molunerfinn/vue-koa-demo)
* [如何使用koa2+es6/7打造高质量Restful API](http://sinn.boyagirl.com/detail/58d9072cc1a5bd0001672cdc)
## 简单修改
> 因为，class+async/await的结合，可以使你更好的组织api的逻辑层，语义更清晰，结构更清晰，代码量更少更轻，更容易维护。至此，你不再需要export每个接口逻辑了。另一个优点，它同样具有很好的性能。
```javascript
// ./server/controllers/todolist.js

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
```
```javascript
// ./server/routes/api.js

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
```
## 表结构
#### 用户表
| 字段        | 类型    |  说明  |
| --------   | -----:   | :----: |
| ID        | int           |  主键，自增           |
| UserName  | char(50)      |   用户名             |
| Password  | char(128)     |   密码，存加密后的    |
#### 事项表
| 字段        | 类型    |  说明  |
| --------   | -----:   | :----: |
| ID        | int      |  主键，自增   |
| UserID    | int      |   用户ID      |
| content  | char(255) |   事项内容    |
| status  | tinyint    |   事项状态    |
## Build Setup

``` bash
# install
yarn

# At localhost:8080
yarn run dev

# server used
node server
```
