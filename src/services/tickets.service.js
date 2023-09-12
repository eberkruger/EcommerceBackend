import TicketsRepository from "../repositories/tickets.repository.js"
import { v4 } from "uuid"

const ticketService = new TicketsRepository()

export default class TicketsService {

  createTicket = async (user, amount) => {

    const newTicket = {
      code: v4(),
      purchase_datetime: new Date().toLocaleString(),
      amount,
      purchaser: user.email
    }

    return await ticketService.createTicket(newTicket)
  }

  getTicket = async (code) => {
    return await ticketService.getTicket(code)
  }
}