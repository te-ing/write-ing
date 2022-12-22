import { PrimaryGeneratedColumn, BaseEntity, CreateDateColumn } from 'typeorm';

export default abstract class Entity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ nullable: true })
  createdAt: Date;

  @CreateDateColumn({ nullable: true })
  updatedAt: Date;
}
