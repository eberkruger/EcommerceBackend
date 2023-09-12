export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
  ACCESS_DENIED: 403,
  UNAUTHORIZED: 401,
}

export class HttpError {
  constructor(description, status = 500, details = null) {
    this.description = description
    this.status = status
    this.details = details
  }
}

export const successResponse = (payload) => {
  return {
    status: 'success',
    payload
  }
}

export const errorResponse = (description, error = null) => {
  return {
    status: 'error',
    description,
    details: error
  }
}