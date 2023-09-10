import httpStatus from "http-status";

export default function errorHandlingMiddleware(error, req, res, next) {
	if (error.type === "userNotFoundError") return res.status(httpStatus.NOT_FOUND).send(error.message);
	if (error.type === "acessDeniedError") return res.status(httpStatus.FORBIDDEN).send(error.message);

	return res.sendStatus(500);
}