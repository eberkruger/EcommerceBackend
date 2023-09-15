import { getDAOS } from "../models/daos/index.daos.js"

const {ticketsDAO}  = getDAOS()

export default class TicketsRepository {
  constructor() {
    this.dao = ticketsDAO
  }

  createTicket = async (ticket) => {
    const result = await this.dao.createTicket(ticket)
    return result
  }

  getTicket = async (code) => {
    const result = await this.dao.getTicket(code)
    return result
  }
}