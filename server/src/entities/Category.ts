import { Column, Entity, Index, OneToMany } from 'typeorm';
import BaseEntity from './Entity';
import Post from './Post';

@Entity('categories')
export default class Category extends BaseEntity {
  @Index()
  @Column()
  name: string;

  @Column()
  status: string;

  @OneToMany(() => Post, (post) => post.category)
  posts: Post[];
}
