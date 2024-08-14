import { dataSource } from "../database/data-source";
import { User } from "Src/database/entities/user.entity";

export class AppContext {
	public static readonly userRepository = dataSource.getRepository(User);
}