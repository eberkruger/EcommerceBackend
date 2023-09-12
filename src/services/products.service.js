import ProductsRepository from "../repositories/products.repository.js"

const productService = new ProductsRepository()

export default class ProductsService {

  getAllProducts = () => {
    return productService.getAllProducts()
  }

  getAll = (limit, page, sort, query) => {
    return productService.getAll(limit, page, sort, query)
  }

  getById = (id) => {
    return productService.getById(id)
  }

  getByCode = (code) => {
    return productService.getByCode(code)
  }

  createProduct = (product) => {
    return productService.createProduct(product)
  }

  updateById = (id, product) => {
    return productService.updateById(id, product)
  }

  deleteById = (id) => {
    return productService.deleteById(id)
  }
}