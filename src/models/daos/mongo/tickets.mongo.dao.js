import { ticketModel } from "../../schema/tickets.schema.js"

export class TicketsManagerDB {

  createTicket = async (ticket) => {
    return await ticketModel.create(ticket)
  }

  getTicket = async (code) => {
    return await ticketModel.findOne({code}).lean()
  }
}
