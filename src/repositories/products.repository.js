import { getDAOS } from "../models/daos/index.daos.js"

const { productsDAO } = getDAOS()

export default class ProductsRepository {
  constructor() {
    this.dao = productsDAO
  }

  getAllProducts = async () => {
    const result = await this.dao.getAllProducts()
    return result
  }

  getAll = async (limit, page, sort, query) => {
    const result = await this.dao.getAll(limit, page, sort, query)
    return result
  }

  getById = async (id) => {
    const result = await this.dao.getById(id)
    return result
  }

  getByCode = async (code) => {
    const result = await this.dao.getByCode(code)
    return result
  }

  createProduct = async (product) => {
    const result = await this.dao.createProduct(product)
    return result
  }

  updateById = async (id, product) => {
    const result = await this.dao.updateById(id, product)
    return result
  }

  deleteById = async (id) => {
    const result = await this.dao.deleteById(id)
    return result
  }
}