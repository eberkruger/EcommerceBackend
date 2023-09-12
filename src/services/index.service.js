import UsersService from "./users.service.js"
import TicketsService from "./tickets.service.js"
import ProductsService from './products.service.js'
import MessagesService from "./messages.service.js"
import CartsService from './carts.service.js'

export const userService = new UsersService()
export const ticketService = new TicketsService()
export const productService = new ProductsService()
export const messagesService = new MessagesService()
export const cartService = new CartsService()
