import { getDAOS } from "../models/daos/index.daos.js"
import UserDTO from "../models/dtos/users.dto.js"

const {usersDAO} = getDAOS()

export default class UsersRepository {
  constructor() {
    this.dao = usersDAO
  }

  createUser = async (user) => {
    const result = await this.dao.createUser(user)
    const dtoResult = new UserDTO(result)
    return dtoResult
  }

  getUser = async (email, cart) => {
    const result = await this.dao.getUser(email, cart)
    return result
  }

  getUserById = async (id) => {
    const result = await this.dao.getUserById(id)
    return result
  }

  getAllUsers = async () => {
    const result = await this.dao.getAllUsers()
    return result
  }

  isEmailRegistered = async (email) => {
    const result = await this.dao.isEmailRegistered(email)
    return result
  }

  updatePassword = async (email, newPassword) => {
    const result = await this.dao.updatePassword(email, newPassword)
    return result
  }

  updateUserRole = async (id, newRole) => {
    const result = await this.dao.updateUserRole(id, newRole)
    return result
  }
}