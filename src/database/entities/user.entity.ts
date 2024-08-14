import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, ManyToMany } from "typeorm";
import { Chat } from "./chat.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  username!: string;

  @Column()
  password!: string;

  @ManyToMany(() => Chat, (chat) => chat.participants)
  chats?: Chat[];
}
