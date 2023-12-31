import express from 'express'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'
import mongoose from 'mongoose'
import http from 'http'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import passport from 'passport'
import cookieParser from 'cookie-parser'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUiExpress from 'swagger-ui-express'

import __dirname from './utils.path.js'
import routers from './routes/index.router.js'
import { ProductManagerDB } from './models/daos/mongo/products.mongo.dao.js'
import { MessagesManagerDB } from './models/daos/mongo/messages.mongo.dao.js'
import { CartsManagerDB } from './models/daos/mongo/carts.mongo.dao.js'
import initializePassport from './config/passport.config.js'
import CONFIG from './config/dotEnv.config.js'
import errorHandler from './middlewares/errors/index.errors.js'
import { addLogger } from './middlewares/logs/logger.js'

const productManagerDB = new ProductManagerDB()
const messagesManagerDB = new MessagesManagerDB()
const cartsManagerDB = new CartsManagerDB()

const app = express()
const server = http.createServer(app)
const io = new Server(server)

/* middlewares */
app.use(express.static(`${__dirname}/public`))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/* handlebars */
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', `${__dirname}/views`)

/* cookies */
app.use(cookieParser())

/* Logger */
app.use(addLogger)

/* swagger */

const swaggerOptions = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'Proyecto de Backend - Coderhouse',
      description: 'Documentación del proyecto de Backend - Coderhouse'
    },
  },
  apis: [`${__dirname}/docs/**/*.yaml`]
}

const specs = swaggerJSDoc(swaggerOptions)
app.use('/api/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))

/* server */
server.listen(CONFIG.PORT, () => {
  console.log(`Server running on port ${CONFIG.PORT}`)
})

/* DB */
mongoose.connect(CONFIG.MONGO_URL)
  .then(() => {
    console.log('Connected to DB');
  })
  .catch(error => {
    console.error('Error connecting to DB:', error);
  })

app.use(session({
  store: new MongoStore({
    mongoUrl: CONFIG.MONGO_URL,
    ttl: 3600
  }),
  secret: CONFIG.MONGO_SECRET,
  resave: true,
  saveUninitialized: true,
}))

/* passport */
app.use(passport.initialize())
app.use(passport.session())
initializePassport()

/* routers */
app.use('/', routers)

app.use(errorHandler)

/* webSocket */
io.on('connection', async socket => {
  console.log('Nuevo cliente conectado')

  const { docs } = await productManagerDB.getAll()
  const products = docs
  const messages = await messagesManagerDB.getAllMessages()
  const carts = await cartsManagerDB.getCarts()

  socket.emit('products', products)

  socket.on('newProduct', async (data) => {
    const result = await productManagerDB.createProduct(data)
    socket.emit('products', result)
  })

  socket.on("deleteProduct", async (id) => {
    const products = await productManagerDB.deleteById(id)
    socket.emit("products", products)
  })

  socket.emit("messages", messages)

  socket.on("newMessage", async (data) => {
    await messagesManagerDB.addMensagger(data)
    socket.emit("messages", messages)
  })

  socket.on('authenticated', async () => {
    socket.emit('messages', messages)
  })

  socket.emit('carts', carts)

  socket.on('newCart', async (data) => {
    const result = await cartsManagerDB.addCart(data)
    socket.emit('carts', result)
  })
})
