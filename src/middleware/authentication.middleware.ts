import { NextFunction, Request, Response } from "express";
import { AppContext } from "Src/helpers/AppContext";
import { NotFoundError } from "Src/helpers/errors/NotFoundError";
import { UnauthorizedAccessError } from "Src/helpers/errors/UnauthorizedAccessError";
import { Jwt } from "Src/helpers/Jwt";

export const authenticationMiddleware = async (request: Request, response: Response, next: NextFunction) => {
  const authorization = request.headers["authorization"];

  if (!authorization) throw new UnauthorizedAccessError();

  const [_type, token] = authorization.split(" ");

  if (!token) throw new UnauthorizedAccessError();

  const payload = Jwt.verify(token);

  if (!payload) throw new UnauthorizedAccessError();

  const user = await AppContext.userRepository.findOne({
    where: {
      id: payload.id,
    },
  });

  if (!user) throw new NotFoundError("Usuário não encontrado");

  request.auth = {
    user,
    token,
  };

  return next();
};
