const Sequelize = require('sequelize')

// 使用url链接的形式进行链接
const Todolist = new Sequelize('mysql://root:123456@localhost/todolist', {
  define: {
    // 奇效Sequelize自动给表加入时间瘥（createdAt和updateAt）
    timestamps: false
  }
})

module.exports = { Todolist }