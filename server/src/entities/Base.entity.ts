import { PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn } from "typeorm"

export abstract class Entity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ nullable: true})
  createdAt: Date;
  
  @CreateDateColumn({ nullable: true})
  updatedAt: Date;
}
