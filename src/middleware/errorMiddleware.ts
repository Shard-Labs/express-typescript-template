import { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/HttpException";
import NotFound from "../exceptions/NotFound";
import BadRequest from "../exceptions/BadRequest";
import { logger } from "../logger/winston";

export function errorMiddleware(error: Error, request: Request, response: Response, next: NextFunction) {
  logger.error(error);
  if (error.message.includes("call exception")) {
    castError(new NotFound(error.message), request, response, next);
  } else if (error.message.includes("network does support") || error.message.includes("invalid input argument")) {
    castError(new BadRequest(error.message), request, response, next);
  } else {
    castError(new HttpException(500, error.message), request, response, next);
  }
}

function castError(error: HttpException, request: Request, response: Response, next: NextFunction) {
  const status = error.status || 500;
  const message = error.message || "Something went wrong";
  response
    .status(status)
    .send({
      status,
      message,
    });
}


export default errorMiddleware;