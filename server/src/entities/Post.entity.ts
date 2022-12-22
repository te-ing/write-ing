import { Entity, Column, Index, OneToMany, BeforeInsert } from 'typeorm';
import BaseEntity from './Base.entity';
import Comment from './Comment.entitiy';

@Entity()
export default class Post extends BaseEntity {
  @Index()
  @Column({ length: 100 })
  title: string;

  @Column({ length: 100, nullable: true })
  subtitle: string;

  @Column({ type: 'text' })
  content: string;

  @Column()
  status: string;

  @Column({ nullable: true })
  tag: string;

  @Column({ type: 'json' })
  like: string;

  @Column({ type: 'json' })
  comment: string;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];
}
