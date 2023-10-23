import chai from 'chai'
import supertest from 'supertest'
import CONFIG from '../src/config/dotEnv.config'
import jwt from 'jsonwebtoken'

const expect = chai.expect
const requester = supertest('http://localhost:8080')

describe('Testin Sessions', () => {

  it('Registar Usuario', async () => {

    const user = {
      first_name: 'Eber',
      last_name: 'Kruger',
      age: 28,
      role: 'admin',
      email: 'eberkruger@gmail.com',
      password: '1234'
    }

    const { statusCode, _body } = await requester.post('/api/users/register').send(user)

    expect(statusCode).to.be.eql(200)
    expect(_body).to.be.an('object')
    expect(_body.data).to.have.property('_id')
  })

  it('Loguear al usuario', async () => {

    const credentials = {
      email: 'eberkruger@gmail.com',
      password: '1234'
    }

    const { statusCode, _body } = await requester.post('/api/users/login').send(credentials)

    const result = jwt.verify(_body.data.accesToken, CONFIG.JWT_SECRET)

    expect(statusCode).to.be.eql(200)
    expect(result).to.be.an('object')
    expect(result).to.have.property('user')
  })
})
