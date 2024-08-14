import { Request, Response } from "express";
import { AppContext } from "Src/helpers/AppContext";
import { Bcrypt } from "Src/helpers/Bcrypt";
import { ConflictError } from "Src/helpers/errors/ConflictError";
import { ValidationError } from "Src/helpers/errors/ValidationError";
import { Jwt } from "Src/helpers/Jwt";
import { passwordRegex } from "Src/helpers/regex/password";
import { usernameRegex } from "Src/helpers/regex/username";
import { z } from "zod";

export class SignUpController extends AppContext {
  private static async _index(request: Request, response: Response) {
    throw new Error("Not implemented controller method.");
  }

  private static async _show(request: Request, response: Response) {
    throw new Error("Not implemented controller method.");
  }

  private static async _store(request: Request, response: Response) {
    const { error, data: body } = z
      .object({
        // username: z.string().regex(usernameRegex),
        // password: z.string().regex(passwordRegex),
        username: z.string(),
        password: z.string(),
      })
      .safeParse(request.body);

    if (error) throw new ValidationError(error.message, error.errors);

    const isUsernameUsed = await this.userRepository.findOne({
      where: {
        username: body.username,
      },
    });

    if (isUsernameUsed) throw new ConflictError("Este nome de usuário está indisponível");

    const user = await this.userRepository.save(
      this.userRepository.create({
        username: body.username,
        password: Bcrypt.hash(body.password),
      })
    );

    const token = Jwt.sign({
      id: user.id,
    });

    return response.status(200).json({
      user,
      token,
    });
  }

  private static async _update(request: Request, response: Response) {
    throw new Error("Not implemented controller method.");
  }

  private static async _destroy(request: Request, response: Response) {
    throw new Error("Not implemented controller method.");
  }

  public static index = SignUpController._index.bind(AppContext);
  public static show = SignUpController._show.bind(AppContext);
  public static store = SignUpController._store.bind(AppContext);
  public static update = SignUpController._update.bind(AppContext);
  public static destroy = SignUpController._destroy.bind(AppContext);
}
