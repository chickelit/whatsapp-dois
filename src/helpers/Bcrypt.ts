import bcrypt from "bcrypt";

export class Bcrypt {
  public static hash(data: string) {
    return bcrypt.hashSync(data, +process.env.BCRYPT_SALT_ROUNDS! || 10);
  }

  public static compare(data: string, encrypted: string) {
    return bcrypt.compareSync(data, encrypted);
  }
}
