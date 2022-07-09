import type { Request, Response, NextFunction } from 'express'
import { isCelebrateError } from 'celebrate'
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

  if (isCelebrateError(err)) {
    const types = ['body', 'query', 'headers']

    const errors = types.reduce((acc, type) => {
      const error = err.details.get(type)?.details[0].message

      if (!error) {
        return acc
      }

      const formattedErrorMessage = error.replace(/"/g, '')

      return [...acc, formattedErrorMessage]
    }, [] as string[])

    return res.status(400).json({
      message: errors[0] // return only the first error
    })
  }

  return res.status(500).json({
    message: 'Internal server error: ' + err?.message ?? 'not specified'
  })
}

export { errorHandler }
