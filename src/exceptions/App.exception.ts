class AppException {
	constructor(
		public readonly statusCode: number,
		public readonly message: string
	) {}
}

export { AppException };