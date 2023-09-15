import CONFIG from '../../config/dotEnv.config.js'

let UsersDAO
let ProductsDAO
let CartsDAO
let TicketsDAO
let ChatsDAO

console.log(`Trabajando con persistencia en ${CONFIG.PERSISTENCE}`)

switch (CONFIG.PERSISTENCE) {

  case 'MONGO': {
    const {default: UsersManagerDB } = await import('../daos/mongo/users.mongo.dao.js')
    UsersDAO = new UsersManagerDB()

    const { ProductManagerDB } = await import('../daos/mongo/products.mongo.dao.js')
    ProductsDAO = new ProductManagerDB()

    const { CartsManagerDB } = await import('../daos/mongo/carts.mongo.dao.js')
    CartsDAO = new CartsManagerDB()

    const { TicketsManagerDB } = await import('../daos/mongo/tickets.mongo.dao.js')
    TicketsDAO = new TicketsManagerDB()

    const { MessagesManagerDB } = await import('../daos/mongo/messages.mongo.dao.js')
    ChatsDAO = new MessagesManagerDB()

    break
  }

  case 'MEMORY': {
    break
  }
}

export { UsersDAO, ProductsDAO, CartsDAO, TicketsDAO, ChatsDAO }