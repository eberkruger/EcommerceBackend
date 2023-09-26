import dotenv from 'dotenv'

dotenv.config()

const CONFIG = {
  MONGO_URL : process.env.MONGO_DB_URL || '',
  PORT: +process.env.PORT || 8080,
  MONGO_SECRET : process.env.MONGO_SECRET,
  CLIENT_ID : process.env.CLIENT_ID,
  CLIENT_SECRET : process.env.CLIENT_SECRET,
  CALLBACK_URL : process.env.CALLBACK_URL,
  ADMIN_EMAIL : process.env.ADMIN_EMAIL,
  ADMIN_PWD : process.env.ADMIN_PWD,
  PERSISTENCE : process.env.PERSISTENCE,
  NODE_ENV : process.env.NODE_ENV,
}

export default CONFIG