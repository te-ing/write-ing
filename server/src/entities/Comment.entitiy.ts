import { Length } from 'class-validator';
import { BeforeInsert, Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import bcrypt from 'bcryptjs';
import BaseEntity from './Base.entity';
import Post from './Post.entity';

@Entity('comments')
export default class Comment extends BaseEntity {
  @Column()
  ip: string;

  @Length(2, 32, { message: '사용자 이름은 2자 이상이어야 합니다.' })
  @Column()
  username: string;

  @Column()
  @Length(4, 32, { message: '비밀번호는 4자리 이상이어야 합니다.' })
  password: string;

  @Column({ type: 'text' })
  content: string;

  @ManyToOne(() => Post, (post) => post.comments)
  post: Post;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 4);
  }
}
