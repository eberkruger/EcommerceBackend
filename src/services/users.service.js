import UsersRepository from "../repositories/users.repository.js"
import CartsRepository from "../repositories/carts.repository.js"
import { userService } from "./index.service.js"

const usersService = new UsersRepository()
const cartService = new CartsRepository()

export default class UsersService {

  createUser = async (user, cart) => {
    let newCart = await cartService.addCart(cart)
    return await usersService.createUser(user, newCart)
  }

  getUser = async (email) => {
    return await usersService.getUser(email)
  }

  getUserById = async (id) => {
    return await userService.getUserById(id)
  }

  getAllUsers = async () => {
    return await usersService.getAllUsers()
  }

  isEmailRegistered = async (email) => {
    return await usersService.isEmailRegistered(email)
  }

  updatePassword = async (email, newPassword) => {
    return await userService.updatePassword(email, newPassword)
  }

  updateUserRole = async (id, newRole) => {
    return await userService.updateUserRole(id, newRole)
  }

}