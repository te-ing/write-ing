import { Column, Entity, Index } from 'typeorm';
import BaseEntity from './Entity';

@Entity('tags')
export default class Tag extends BaseEntity {
  @Index()
  @Column()
  name: string;

  @Column({ nullable: false })
  status: string;
}
