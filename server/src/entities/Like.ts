import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import BaseEntity from './Entity';
import Post from './Post';
import { User } from './User';

@Entity('likes')
export default class Like extends BaseEntity {
  @Column()
  value: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'username', referencedColumnName: 'username' })
  user: User;

  @Column()
  username: string;

  @Column({ nullable: true })
  postId: number;

  @ManyToOne(() => Post)
  post: Post;
}
