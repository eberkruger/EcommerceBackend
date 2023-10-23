import chai from 'chai'
import supertest from 'supertest'
import CONFIG from '../src/config/dotEnv.config'
import jwt from 'jsonwebtoken'

const expect = chai.expect
const requester = supertest('http://localhost:8080')

describe('Testin products', () => {

  let authToken

  before(async () => {

    const user = {
      _id: '64cfc8793e4d0d4a66ff0c87',
      first_name: 'Eber',
      last_name: 'Kruger',
      email: 'eberkruger@gmail.com',
      age: 28,
      password: '$2b$10$pAt7Tstb4X1xldBzwB9ZveazGF059qL86xrnHjCJtdaNfKYaqFvlC',
      role: 'premium'
    }

    authToken = jwt.sign({ user }, CONFIG.JWT_SECRET, { expiresIn: '1m' })
  })

  it('POST /api/products Crear un nuevo producto', async () => {

    const product = {
      title: 'Televisor',
      description: 'Televisor HD',
      code: 'televisor123',
      price: 122000,
      stock: 23,
      category: 'Televisor',
    }

    const { statusCode, _body } = await requester.post('/api/products').send(product).set('Authorization', `Bearer ${authToken}`)

    expect(statusCode).to.be.eql(200)
    expect(_body.data.code).to.be.eql('televisor123')
    expect(_body.data).to.be.property('_id')
  })

  it('GET /api/products Obtenere todos los productos', async () => {

    const { statusCode, _body } = await requester.get('/api/products')

    expect(statusCode).to.be.eql(200)
    expect(_body.data.totalPages).to.be.greaterThan(0)
  })

  it('GET /api/products/:pid Obtenere un producto según su ID', async () => {

    const product = {
      title: 'Celular',
      description: 'Smartphone',
      code: 'cel123',
      price: 220000,
      stock: 10,
      category: 'Celular',
    }


    const { statusCode, _body } = await requester.post('/api/products').send(product).set('Authorization', `Bearer ${authToken}`)
    expect(statusCode).to.be.eql(200)

    const cid = _body.data._id;
    const result = await requester.get(`/api/products/${cid}`).set('Authorization', `Bearer ${authToken}`)

    const token = jwt.verify(authToken, CONFIG.JWT_SECRET)

    expect(result.statusCode).to.be.eql(200)
    expect(result._body.data._id).to.be.eql(cid)
    expect(token.user._id).to.be.eql(result._body.data.owner)
  })

  it('PUT /api/products/:pid Modificar un producto según su ID', async () => {

    const product = {
      title: 'Tablet',
      description: 'Descripcion de tablet',
      code: 'Tablet123',
      price: 100000,
      stock: 20,
      category: 'Tablet',
    };


    const { statusCode, _body } = await requester.post('/api/products').send(product).set('Authorization', `Bearer ${authToken}`)
    const cid = _body.data._id

    expect(statusCode).to.be.eql(200)

    const newProduct = {
      title: 'Tablet update',
      description: 'Descripcion de tablet update',
      code: 'Tablet1234',
      price: 100000,
      stock: 20,
      category: 'Tablet',
    }

    const updateResult = await requester.put(`/api/products/${cid}`).send(newProduct).set('Authorization', `Bearer ${authToken}`)

    expect(updateResult.statusCode).to.be.eql(200)
    expect(updateResult._body.data).to.have.property('acknowledged')
  })
})