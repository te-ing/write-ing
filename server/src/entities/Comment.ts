import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, UpdateDateColumn } from 'typeorm';
import BaseEntity from './Entity';
import Post from './Post';
import { User } from './User';

@Entity('comments')
export default class Comment extends BaseEntity {
  @Index()
  @Column()
  identifier: string;

  @Column()
  body: string;

  @Column()
  nickname: string;

  @Column()
  status: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'nickname', referencedColumnName: 'nickname' })
  user: User;

  @ManyToOne(() => Post, (post) => post.comments, { nullable: false })
  post: Post;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
