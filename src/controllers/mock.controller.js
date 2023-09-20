import { generateProductsMock } from '../mocks/products.mock.js'

const getMocksProductsController = async (req, res) => {
  const result = await generateProductsMock(10)
  res.send(result.payload)
}

export default getMocksProductsController

