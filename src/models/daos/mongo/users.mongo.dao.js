import userModel from "../../schema/users.schema.js"

export default class UsersManagerDB {

  createUser = async (user, cart) => {
    try {
      user.cart = cart._id
      return await userModel.create(user)
    } catch (error) {
      throw new Error('Falla al crear usuario')
    }
  }

  getUser = async (email) => {
    return await userModel.findOne({ email: email }).lean()
  }

  getUserById = async (id) => {
    return await userModel.findOne({ _id: id })
  }

  getAllUsers = async () => {
    return await userModel.find().lean()
  }

  isEmailRegistered = async (email) => {
    const user = await userModel.findOne({ email }).lean()
    return user !== null
  }

  updatePassword = async (email, newPassword) => {
    let user = await userModel.findOne({ email })

    if (!user) {
      throw new Error('Usuario no encontrado')
    }

    await userModel.updateOne({ _id: user._id }, { $set: { password: newPassword } })
  }

  updateUserRole = async (id, newRole) => {
    let user = await userModel.findOne({_id: id})

    if(!user) {
      throw new Error('Usuario no encontrado')
    }

    await userModel.updateOne({_id: user._id}, {$set: {role: newRole}})
  }

}