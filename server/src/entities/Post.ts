import { Exclude, Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';
import Comment from './Comment';
import BaseEntity from './Entity';
import Category from './Category';
import { User } from './User';
import Tag from './Tag';
import Like from './Like';

@Entity('posts')
export default class Post extends BaseEntity {
  @Index()
  @Column()
  identifier: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  title: string;

  @Column()
  subtitle: string;

  @Column()
  tagName: string;

  @Column()
  username: string;

  @Column({ nullable: true, type: 'text' })
  content: string;

  @Column()
  status: number;

  @Column()
  view: number;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'identifier', referencedColumnName: 'identifier' })
  author: User;

  @ManyToOne(() => Category, (category) => category.posts)
  @JoinColumn({ name: 'name', referencedColumnName: 'name' })
  category: Category[];

  @OneToMany(() => Tag, (tag) => Tag.name)
  tags: Tag[];

  @Exclude()
  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @Exclude()
  @OneToMany(() => Like, (like) => like.post)
  likes: Like[];

  @Expose() get url(): string {
    return `/r/${this.category}/${this.identifier}/${this.title}`;
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
