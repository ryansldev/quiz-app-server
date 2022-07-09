class AppException {
  constructor (
    public readonly statusCode: number,
    public readonly message: string
  ) {
    console.log(statusCode, message)
  }
}

export { AppException }
