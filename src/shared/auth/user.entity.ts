import { OneToMany, Column, Entity, BeforeInsert, BeforeUpdate } from 'typeorm';
import { IsDefined, MinLength } from 'class-validator';
import * as bcrypt from 'bcryptjs';
import { Todo } from "../../todo/todo.entity";
import { BaseEntity } from "../base.entity";

@Entity()
export default class User extends BaseEntity {
	constructor(fields: { username: string, password: string }) {
		super();
		if (fields) Object.assign(this, fields);
		// if the user is inserted or updated, hash the password
		if (fields && fields.username && fields.password) {
			this.hashPassword(this.password);		
		}
	}

	@MinLength(1)
  @Column({ unique: true })
	public username: string;

	@MinLength(1)
	@Column()
	public password: string;

	@Column({ default: false })
	public isAdmin: boolean;

	@OneToMany(type => Todo, todo => todo.owner,{
		cascadeInsert: true,
		cascadeUpdate: true
	})
	public todos: Todo[]
	
  hashPassword(password) {
		this.password = bcrypt.hashSync(password, 10);
  }
  
	validatePassword(plainTextPassword: string) {
		return bcrypt.compareSync(plainTextPassword, this.password)
	}

	static validate(user: User): string {
		if (!user.username) {
			return 'username is required';
		}

		if (!user.password) {
			return 'password is required';
		}
	}
}