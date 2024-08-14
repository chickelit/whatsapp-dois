import { ChatTypes } from "Src/types/ChatTypes";
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, ManyToMany, JoinTable } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Chat {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ default: ChatTypes.Group })
  type!: string;

  @ManyToMany(() => User, (user) => user.chats)
  @JoinTable()
  participants!: User[];

  @BeforeInsert()
  @BeforeUpdate()
  setType() {
    if (this.participants.length > 2) this.type = ChatTypes.Group;
  }
}
