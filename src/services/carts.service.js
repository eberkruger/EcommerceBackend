import CartsRepository from "../repositories/carts.repository.js"

const cartService = new CartsRepository()

export default class CartsService {

  getCarts = () => {
    return cartService.getCarts()
  }

  getCartById = (id) => {
    return cartService.getCartById(id)
  }

  addCart = (cart) => {
    return cartService.addCart(cart)
  }

  addProduct = (cid, pid) => {
    return cartService.addProduct(cid, pid)
  }

  updateAllProducts = (cid, products) => {
    return cartService.updateAllProducts(cid, products)
  }

  updateQuantity = (cid, pid, updatedQuantity) => {
    return cartService.updateQuantity(cid, pid, updatedQuantity)
  }

  deleteProductOfCart = (cid, pid) => {
    return cartService.deleteProductOfCart(cid, pid)
  }

  deleteAllProductsOfCart = (cid) => {
    return cartService.deleteAllProductsOfCart(cid)
  }
}