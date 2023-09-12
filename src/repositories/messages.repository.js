import { getDAOS } from "../models/daos/index.daos.js"

const chatsDAO  = getDAOS()

export default class ChatsRepository {
  constructor() {
    this.dao = chatsDAO
  }

  addMensagger = async (message) => {
    const result = await this.dao.addMensagger(message)
    return result
  }

  getAllMessages = async () => {
    const result = await this.dao.getAllMessages()
    return result
  }
}