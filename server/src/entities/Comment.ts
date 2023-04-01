import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, UpdateDateColumn } from 'typeorm';
import BaseEntity from './Entity';
import Post from './Post';
import { User } from './User';

@Entity('comments')
export default class Comment extends BaseEntity {
  @Column()
  body: string;

  @Column()
  nickname: string;

  @Column({ default: 'public' })
  status: string;

  @Column()
  postId: number;

  @ManyToOne(() => Post, (post) => post.comments, { nullable: false })
  post: Post;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
