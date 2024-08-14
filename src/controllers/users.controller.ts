import { Request, Response } from "express";
import { AppContext } from "Src/helpers/AppContext";

export class UserController extends AppContext {
  private static async _index(request: Request, response: Response) {
    throw new Error("Not implemented controller method.");
  }

  private static async _show(request: Request, response: Response) {
    throw new Error("Not implemented controller method.");
  }

  private static async _store(request: Request, response: Response) {
    throw new Error("Not implemented controller method.");
  }

  private static async _update(request: Request, response: Response) {
    throw new Error("Not implemented controller method.");
  }

  private static async _destroy(request: Request, response: Response) {
    throw new Error("Not implemented controller method.");
  }

  public static index = UserController._index.bind(AppContext);
  public static show = UserController._show.bind(AppContext);
  public static store = UserController._store.bind(AppContext);
  public static update = UserController._update.bind(AppContext);
  public static destroy = UserController._destroy.bind(AppContext);
}
