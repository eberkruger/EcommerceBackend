import winston from 'winston'
import CONFIG from '../../config/dotEnv.config.js'

const levelOptions = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    debug: 4
  },

  colors: {
    fatal: 'red',
    error: 'orange',
    warning: 'yellow',
    info: 'blue',
    debug: 'white'
  }
}

const prodLogger = winston.createLogger({
  levels: levelOptions.levels,
  transports: [
    new winston.transports.Console({
      level: 'info',
      format: winston.format.combine(
        winston.format.colorize({ colors: levelOptions.colors }),
        winston.format.simple()
      )
    }),
    new winston.transports.File({
      filename: 'logs/errors.log',
      level: 'error',
      format: winston.format.simple()
    })
  ]
})

const devLogger = winston.createLogger({
  levels: levelOptions.levels,
  transports: [
    new winston.transports.Console({
      level: 'debug',
      format: winston.format.combine(
        winston.format.colorize({ colors: levelOptions.colors }),
        winston.format.simple()
      )
    })
  ]
})

export const addLogger = (req, res, next) => {
  req.logger = CONFIG.NODE_ENV === 'production' ? prodLogger : devLogger

  if (req.logger === prodLogger) {
    req.logger.info(`Método ${req.method} en ${req.url} - ${new Date().toDateString()}`)
  }
  next()
}