import { Request, Response } from "express";
import { AppContext } from "Src/helpers/AppContext";
import { Bcrypt } from "Src/helpers/Bcrypt";
import { NotFoundError } from "Src/helpers/errors/NotFoundError";
import { TeapotError } from "Src/helpers/errors/TeapotError";
import { ValidationError } from "Src/helpers/errors/ValidationError";
import { Jwt } from "Src/helpers/Jwt";
import { z } from "zod";

export class SignInController extends AppContext {
  private static async _index(request: Request, response: Response) {
    throw new Error("Not implemented controller method.");
  }

  private static async _show(request: Request, response: Response) {
    return response.status(200).json(request.auth);
  }

  private static async _store(request: Request, response: Response) {
    const { error, data: body } = z
      .object({
        username: z.string(),
        password: z.string(),
      })
      .safeParse(request.body);

    if (error) throw new ValidationError(error.message, error.errors);

    const user = await this.userRepository.findOne({
      where: {
        username: body.username,
      },
    });

    if (!user || !Bcrypt.compare(body.password, user.password)) throw new TeapotError("Login inválido");

    const token = Jwt.sign({
      id: user.id,
    });

    return response.status(200).json({ user, token });
  }

  private static async _update(request: Request, response: Response) {
    throw new Error("Not implemented controller method.");
  }

  private static async _destroy(request: Request, response: Response) {
    throw new Error("Not implemented controller method.");
  }

  public static index = SignInController._index.bind(AppContext);
  public static show = SignInController._show.bind(AppContext);
  public static store = SignInController._store.bind(AppContext);
  public static update = SignInController._update.bind(AppContext);
  public static destroy = SignInController._destroy.bind(AppContext);
}
