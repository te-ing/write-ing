import { instanceToPlain } from 'class-transformer';
import { BaseEntity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export default abstract class Entity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  toJSON() {
    return instanceToPlain(this);
  }
}
