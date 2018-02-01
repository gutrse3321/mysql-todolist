<template>
  <el-row class="content">
    <el-col :xs="24" :sm="{span: 6, offset: 9}">
      <span class="title">
        欢迎登陆
      </span>
      <el-row>
        <el-input v-model="account"
          placeholder="账号"
          type="text">
        </el-input>
        <el-input v-model="password"
          placeholder="密码"
          type="password">
        </el-input>
        <el-button type="primary" @click="loginTodo">登陆</el-button>
      </el-row>
    </el-col>
  </el-row>
</template>
<script>
export default {
  data () {
    return {
      account: '',
      password: ''
    }
  },
  methods: {
    loginTodo () {
      // this.$router.push('/todolist')
      let obj = {
        name: this.account,
        password: this.password
      }
      // 将信息发送给后端
      this.$http.post('/auth/user', obj)
        .then((res) => {
          // axios返回的数据在res.data里
          if (res.data.success) {
            // 保存为session
            sessionStorage.setItem('todo-token', res.data.token)
            this.$message({
              type: 'success',
              message: '登陆成功！'
            })
            // 登陆成功，跳转todolist页面
            this.$router.push('/todolist')
          } else {
            // 登陆失败，显示提示语
            this.$message.error(res.data.info)
            // 消除session
            sessionStorage.setItem('todo-token', null)
          }
        }, (err) => {
          this.$message.error('请求错误！')
          sessionStorage.setItem('todo-token', null)
        })
    }
  }
}
</script>
<style lang="stylus" scoped>
  .el-row.content
    padding 16px
  .title
    font-size 28px
  .el-input
    margin 12px 0
  .el-button
    width 100%
    margin-top 12px
</style>
