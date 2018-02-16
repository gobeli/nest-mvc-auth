import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import User from '../shared/auth/user.entity';
import { BaseEntity } from '../shared/base.entity';

@Entity()
export class Todo extends BaseEntity {
  @Column({ length: 500 })
  text: string;

  @ManyToOne(type => User, user => user.todos)
  owner: User;
  
  validate(): string {
    if (!this.text) {
      return 'text is required';
    }
  }
}