import { userService } from "../services/index.service.js"
import { createHash, isValidPassword } from "../utils/utils.js"
import Mail from "../helpers/mail.js"
import jwt from 'jsonwebtoken'
import CONFIG from "../config/dotEnv.config.js"
import UserDTO from "../models/dtos/users.dto.js"

const register = async (req, res) => {
  res.send({ status: 'success', message: 'User Registered' })
}

const registerError = async (req, res) => {
  res.status(400).json({ status: 'Error', error: req.session.messages })
}

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers()
    res.send(users)
  } catch (error) {
    console.log(error)
  }
}

const login = async (req, res) => {
  try {
    if (!req.user) return res.status(401).send({ status: 'error', error: 'Invalid Credentials' })
    req.session.user = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      age: req.user.age,
      email: req.user.email,
      role: req.user.role
    }
    res.send({ status: 'success', message: 'Login success' })
  } catch (error) {
    console.log(error)
  }
}

const loginError = async (req, res) => {
  try {
    if (!req.session) { return res.status(400).json({ message: 'Sesión no encontrada' }) }

    if (req.session.messages) { if (req.session.messages.length > 4) { return res.status(400).json({ message: 'Cantidad de intentos superada' }) } }

    res.status(400).json({ status: 'Error', error: req.session.messages })
  } catch (error) {
    console.log(error)
  }
}

const logout = async (req, res) => {
  try {
    req.session.destroy(err => {
      if (err) return res.status(400).send({ status: 'Error', payload: err })
      res.redirect('/login')
    })
  } catch (error) {
    console.log(error)
  }
}

const github = async (req, res) => {
  try {
    res.send({ status: 'success', mesagge: 'User registered' })
  } catch (error) {
    console.log(error)
  }
}

const githubcallback = async (req, res) => {
  try {
    req.session.user = req.user
    res.redirect('/')
  } catch (error) {
    console.log(error)
  }
}

const current = async (req, res) => {
  try {
    let userDto = new UserDTO(req.user)
    res.send(userDto)
  } catch (error) {
    console.log(error)
  }
}

const resetPassword = async (req, res) => {
  const {email, password} = req.body

  if (!email||!password) {
    return res.status(400).send({status: 'error', error: 'Valores incompletos'})
  }

  try {
    const user = await userService.getUser(email)
    
    if (isValidPassword(user, password)) {
      return res.status(400).send({status: 'error', error: 'La nueva contraseña es igual a la antigua que quieres cambiar'})
    }

    const newHashedPassword = createHash(password)

    await userService.updatePassword(email, newHashedPassword)

    return res.send({status: 'success', message: 'Contraseña actualizada'})

  } catch (error) {
    return res.status(404).send({status: 'error', error: error.mesagge})
  }
}

const requestResetPassword = async (req, res) => {
  const {email} = req.body

  if (!email) {
    return res.status(400).send({status: 'error', error: 'Datos incompletos'})
  }

  try {
    const user = await userService.getUser(email)

    if (!user){ 
      return res.status(404).send({status: 'error', error: 'No existe un usuario con ese Email'})
    }

    let token = jwt.sign({email}, CONFIG.JWT_SECRET, {expiresIn: '1h'})

    let mail = new Mail()

    await mail.send(
      user,
      'Password reset',
      `
      <div style='color: blue'>
        <h1> Restaura tu email haciendo click en el siguiente link </h1>
        <p> http://localhost:8080/resetPassword?token=${token}
      </div>
      `
    )

    return res.send({status: 'success', message: 'Email enviado'})
  } catch (error) {
    return res.status(404).send({status: 'error', error: error.mesagge})
  }
}

const changeRole = async (req, res) => {
  try {
    let userId = req.params.userId
    let user = await userService.getUserById(userId)

    switch(user.role) {
      case "user":
        await userService.updateUserRole(userId, "premium")
        return res.send({status: "success", message: "User role upgraded to premium"});
      case "premium":
        await userService.updateUserRole(userId, "user")
        return res.send({status: "success", message: "User role degraded to user"});
      default:
        return res.status(400).
        send({status: "failure", details: "Invalid role. Role can't be updated"})
    }

  } catch (error) {
    return res.status(404).send({status: 'error', error: error.mesagge})
  }
}



export default {
  register,
  registerError,
  getAllUsers,
  login,
  loginError,
  logout,
  github,
  githubcallback,
  current,
  resetPassword,
  requestResetPassword,
  changeRole
}

