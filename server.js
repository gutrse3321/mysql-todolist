const Koa =  require('koa')
const Router = require('koa-router')
const json = require('koa-json')
const logger = require('koa-logger')
const BodyParser = require('koa-bodyparser')
const jwt = require('koa-jwt')
const auth = require('./server/routes/auth')
const api = require('./server/routes/api')

const app = new Koa()
const router = Router()

app.use(BodyParser())
app.use(json())
app.use(logger())

let port = 3000

app.use(async (ctx, next) => {
  let start = new Date()
  await next()
  let ms = new Date() - start
  console.log('%s %s - %s', ctx.method, ctx.url, ms)
})

// 如果jwt验证失败，返回验证失败信息
app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    if (err.status === 401) {
      ctx.status = 401
      ctx.body = {
        success: false,
        token: null,
        info: '受保护的资源，使用Authorization头部信息获取数据'
      }
    } else {
      throw err
    }
  }
})

// 挂载到koa-router上
// 同时会让所有的auth请求后面加上/auth
router.use('/auth', auth.routes())
// 所有/api路径请求都需要jwt验证
router.use('/api', jwt({secret: 'mysql-todolist'}), api.routes())
// 将路由规则挂载到Koa上
app.use(router.routes())

app.on('error', (err, ctx) => {
  console.log(`server error: ${err}`)
})

app.listen(port, () => {
  console.log(`Server is listening on ${port}`)
})

module.exports = app
