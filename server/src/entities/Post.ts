import { Exclude, Expose } from 'class-transformer';
import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, OneToMany, UpdateDateColumn } from 'typeorm';
import Comment from './Comment';
import BaseEntity from './Entity';
import { User } from './User';
import Like from './Like';

@Entity('posts')
export default class Post extends BaseEntity {
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  title: string;

  @Column({ nullable: true, type: 'text' })
  subtitle: string;

  @Column()
  nickname: string;

  @Column({ type: 'text' })
  content: string;

  @Column()
  status: string;

  @Column({ default: 0 })
  view: number;

  @Column({ nullable: true })
  category: string;

  @Column({ nullable: true })
  tag: string;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @Exclude()
  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @Exclude()
  @OneToMany(() => Like, (like) => like.post)
  likes: Like[];

  @Expose() get url(): string {
    return `/post/${this.id}`;
  }

  @Expose() get commentCount(): number {
    return this.comments?.length;
  }

  @Expose() get likeScore(): number {
    return this.likes?.reduce((memo, curt) => memo + (curt.value || 0), 0);
  }

  protected userLike: number;

  setUserLike(user: User) {
    const index = this.likes?.findIndex((v) => v.username === user.nickname);
    this.userLike = index > -1 ? this.likes[index].value : 0;
  }
}
