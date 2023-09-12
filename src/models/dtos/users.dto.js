export default class UserDTO {
  constructor(payload) {
    this.first_name = payload.first_name
    this.last_name = payload.last_name
    this.email = payload.email
    this.age = payload.age
    this.role = payload.role
    this.cart = payload.cart
    this._id = payload._id
  }
}