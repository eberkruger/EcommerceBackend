import { UsersDAO, TicketsDAO, ProductsDAO, ChatsDAO, CartsDAO } from "../factory/daos.factory.js"

const usersDAO = UsersDAO
const ticketsDAO = TicketsDAO
const productsDAO = ProductsDAO
const chatsDAO = ChatsDAO
const cartsDAO = CartsDAO

export const getDAOS = () => {
  usersDAO,
  ticketsDAO,
  productsDAO,
  chatsDAO,
  cartsDAO
}