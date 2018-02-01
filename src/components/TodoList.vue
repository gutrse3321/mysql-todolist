<template>
  <el-row class="content">
    <el-col :xs="{span: 20, offset: 2}" :sm="{span: 8, offset: 8}">
      <span>
        欢迎： {{ name }}！你的待办事项是：
      </span>
      <el-input v-model="todos" @keyup.enter.native="addTodos" placeholder="输入待办事项"></el-input>
      <el-tabs v-model="activeName">
        <el-tab-pane label="待办事项" name="first">
          <el-col :xs="24">
            <template v-if="!Done">
              <template v-for="(item, index) in list">
                <div class="todo-list" v-if="item.status === 0" :key="index">
                  <span class="item no-finished">
                    {{ index + 1 }}. {{ item.content }}
                  </span>
                  <span class="pull-right">
                    <el-button size="small" type="primary" @click="update(index)">完成</el-button>
                    <el-button size="small" :plain="true" type="danger" @click="remove(index)">删除</el-button>
                  </span>
                </div>
              </template>
            </template>
            <div v-else-if="Done">
              暂无待办事项
            </div>
          </el-col>
        </el-tab-pane>
        <el-tab-pane label="已完成事项" name="second">
          <template v-if="count > 0">
            <template v-for="(item, index) in list">
              <div class="todo-list" v-if="item.status === 1" :key="index">
                <span class="item finished">
                  {{ index + 1 }}. {{ item.content }}
                </span>
                <span class="pull-right">
                  <el-button size="small" type="primary" @click="update(index)">还原</el-button>
                </span>
              </div>
            </template>
          </template>
          <div v-else>
            暂无已完成事项
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</template>
<script>
import jwt from 'jsonwebtoken'

export default {
  data () {
    return {
      name: '',
      todos: '',
      activeName: 'first',
      list: [],
      count: 0,
      id: ''
    }
  },
  created () {
    const userInfo = this.getUserInfo()
    if (userInfo !== null) {
      this.id = userInfo.id
      this.name = userInfo.name
    } else {
      this.id = ''
      this.name = ''
    }
    // 在组件创建时获取todolist
    this.getTodolist()
  },
  computed: {
    // 计算是否已经完成了所有任务
    Done () {
      let count = 0
      let length = this.list.length
      for (let i in this.list) {
        this.list[i].status === 1 ? count += 1 : ''
      }
      this.count = count
      if (count === length || length === 0) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    addTodos () {
      if (this.todos === '') {
        return
      }
      let obj = {
        status: false,
        content: this.todos,
        id: this.id
      }
      // 新增创建请求
      this.$http.post('/api/todolist', obj)
        .then((res) => {
          // 当返回的状态为200成功时
          if (res.status === 200) {
            this.$message({
              type: 'success',
              message: '创建成功'
            })
            this.getTodolist()
          } else {
            this.$message.error('创建失败！')
          }
        }, (err) => {
          this.$message.error('创建失败！')
          console.log(err)
        })
      // 清空当前输入的todos
      this.todos = ''
    },
    getTodolist () {
      // 发送获取todolist请求
      const getTodolist = this.$http.get('/api/todolist/' + this.id)
      getTodolist.then((res) => {
        if (res.status === 200) {
          this.list = res.data.result
          this.$message('花Q')
          // console.log(this.list)
        } else {
          this.$message.error('获取列表失败')
        }
      }, (err) => {
        this.$message.error('获取列表失败')
        console.log(err)
      })
      return getTodolist
    },
    update (index) {
      this.$http.put(`/api/todolist/${this.id}/${this.list[index].ID}/${this.list[index].status}`)
        .then((res) => {
          if (res.status === 200) {
            this.$message({
              type: 'success',
              message: '事项更新成功'
            })
            this.getTodolist()
          } else {
            this.$message.error('事项更新失败')
          }
        }, (err) => {
          this.$message.error('事项更新失败')
          console.log(err)
        })
    },
    remove (index) {
      this.$http.delete(`/api/todolist/${this.id}/${this.list[index].ID}`)
        .then((res) => {
          if (res.status === 200) {
            this.$message({
              type: 'success',
              message: '事项删除成功'
            })
            this.getTodolist()
          } else {
            this.$message.error('事项删除失败')
          }
        }, (err) => {
          this.$message.error('事项删除失败')
          console.log(err)
        })
    },
    // 获取用户信息
    getUserInfo () {
      const token = sessionStorage.getItem('todo-token')
      if (token !== null && token !== 'null') {
        // 解析token
        let decode =jwt.decode(token)
        
        return decode
      } else {
        return null
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.el-input
  margin 20px auto
.todo-list
  width 100%
  margin-top 8px
  padding-bottom 8px
    border-bottom 1px solid #eee
    overflow hidden
    text-align left
    .item
      font-size 20px
      &.finished
        text-decoration line-through
        color #ddd
.pull-right
  float right
</style>
