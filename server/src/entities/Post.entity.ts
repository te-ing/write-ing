import { Entity, Column, Index, OneToMany } from 'typeorm';
import { Comment } from './Comment.entitiy';

@Entity()
export class Post {
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

  @OneToMany(() => Comment, (comment) => comment.posts)
  posts: Post[];
}
