import ChatsRepository from "../repositories/messages.repository.js"

const messageService = new ChatsRepository()

export default class MessagesService {

  addMensagger = (message) => {
    return messageService.addMensagger(message)
  }

  getAllMessages = () => {
    return messageService.getAllMessages()
  }
}