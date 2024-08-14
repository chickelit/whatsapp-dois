import jsonwebtoken from "jsonwebtoken";

type JwtPayload = {
  id: string;
};

export class Jwt {
  public static sign(payload: JwtPayload) {
    return jsonwebtoken.sign(payload, process.env.JWT_SECRET!);
  }

  public static verify(token: string): JwtPayload {
    return jsonwebtoken.verify(token, process.env.JWT_SECRET!) as JwtPayload;
  }
}
