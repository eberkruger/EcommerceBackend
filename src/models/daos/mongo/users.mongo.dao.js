import userModel from "../../schema/users.schema.js"

export default class UsersManagerDB {

  createUser = async (user) => {
    return await userModel.create(user)
  }

  getUser = async (email) => {
    return await userModel.findOne({ email: email }).lean()
  }

  getAllUsers = async () => {
    return await userModel.find().lean()
  }

  isEmailRegistered = async (email) => {
    const user = await userModel.findOne({ email }).lean()
    return user !== null
  }

}