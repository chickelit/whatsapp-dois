import { Request, Response } from "express";
import { AppContext } from "Src/helpers/AppContext";
import { NotFoundError } from "Src/helpers/errors/NotFoundError";
import { ValidationError } from "Src/helpers/errors/ValidationError";
import { z } from "zod";

export class MessageController extends AppContext {
  private static async _index(request: Request, response: Response) {
    throw new Error("Not implemented controller method.");
  }

  private static async _show(request: Request, response: Response) {
    throw new Error("Not implemented controller method.");
  }

  private static async _store(request: Request, response: Response) {
    const { error, data: body } = z
      .object({
        userId: z.string(),
        room: z.string(),
        text: z.string(),
      })
      .safeParse(request.body);

    if (error) throw new ValidationError(error.message, error.errors);

    const user = await this.userRepository.findOne({
      where: {
        username: body.userId,
      },
    });

    if (!user) throw new NotFoundError("Usuário não encontrado");
  }

  private static async _update(request: Request, response: Response) {
    throw new Error("Not implemented controller method.");
  }

  private static async _destroy(request: Request, response: Response) {
    throw new Error("Not implemented controller method.");
  }

  public static index = MessageController._index.bind(AppContext);
  public static show = MessageController._show.bind(AppContext);
  public static store = MessageController._store.bind(AppContext);
  public static update = MessageController._update.bind(AppContext);
  public static destroy = MessageController._destroy.bind(AppContext);
}
