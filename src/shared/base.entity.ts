import { PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn() 
  created: Date;

  static factory<T>(type: { new (fields): T }, fields): T {
    return new type(fields);
  }
}