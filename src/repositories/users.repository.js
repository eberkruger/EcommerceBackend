import { getDAOS } from "../models/daos/index.daos.js"
import UserDTO from "../models/dtos/users.dto.js"

const usersDAO  = getDAOS()

export default class UsersRepository {
  constructor() {
    this.dao = usersDAO
  }

  createUser = async (user) => {
    const result = await this.dao.createUser(user)
    const dtoResult = new UserDTO(result)
    return dtoResult
  }

  getUser = async (email) => {
    const result = await this.dao.getUser(email)
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
}