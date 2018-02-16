import { OneToMany, Column, Entity, BeforeInsert, BeforeUpdate } from "typeorm";

@Entity()
export default class Session {
  @Column({ primary: true, length: 128, name: 'session_id' })
  public id: string;
  
  @Column()
  public expires: number;

  @Column({ type: 'text' })
  public data: string;
}