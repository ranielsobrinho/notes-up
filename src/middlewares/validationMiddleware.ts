import { Request, Response, NextFunction } from 'express'
import * as yup from 'yup'

const validate = (schema) => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { body } = req
  try {
    schema
      .validate(body)
      .then()
      .catch((error: { path: any; message: any }) =>
        res.status(400).json({
          [error.path]: error.message,
        })
      )
    return next()
  } catch (error) {
    return res.json(error)
  }
}

export default validate
