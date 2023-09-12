import UsersRepository from "../repositories/users.repository.js"

const productService = new UsersRepository()

export default class UsersService {

  createUser = async (user) => {
    return await productService.createUser(user)
  }

  getUser = async (email) => {
    return await productService.getUser(email)
  }

  getAllUsers = async () => {
    return await productService.getAllUsers()
  }

  isEmailRegistered = async (email) => {
    return await productService.isEmailRegistered(email)
  }
}