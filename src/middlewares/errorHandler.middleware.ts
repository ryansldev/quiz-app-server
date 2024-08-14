import type { Request, Response, NextFunction } from 'express'
import { AppException } from '~exceptions/App.exception'

const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) => {
  if (err instanceof AppException) {
    return res.status(err.statusCode).json({ message: err.message })
  }

  return res.status(500).json({
    message: 'Internal server error: ' + err?.message ?? 'not specified'
  })
}

export { errorHandler }
