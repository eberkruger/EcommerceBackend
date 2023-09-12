import { getDAOS } from "../models/daos/index.daos.js"

const cartsDAO  = getDAOS()

export default class CartsRepository {
  constructor() {
    this.dao = cartsDAO
  }

  getCarts = async () => {
    const result = await this.dao.getCarts()
    return result
  }

  getCartById = async (id) => {
    const result = await this.dao.getCartById(id)
    return result
  }

  addCart = async (cart) => {
    const result = await this.dao.addCart(cart)
    return result
  }

  addProduct = async (cid, pid) => {
    const result = await this.dao.addProduct(cid, pid)
    return result
  }

  deleteProductOfCart = async (cid, pid) => {
    const result = await this.dao.deleteProductOfCart(cid, pid)
    return result
  }

  deleteAllProductsOfCart = async (cid) => {
    const result = await this.dao.deleteAllProductsOfCart(cid)
    return result
  }

  updateAllProducts = async (cid, products) => {
    const result = await this.dao.updateAllProducts(cid, products)
    return result
  }

  updateQuantity = async (cid, pid, updatedQuantity) => {
    const result = await this.dao.updateQuantity(cid, pid, updatedQuantity)
    return result
  }
}