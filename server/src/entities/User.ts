import { IsEmail, Length } from 'class-validator';
import { Entity, Column, Index, OneToMany, BeforeInsert, CreateDateColumn } from 'typeorm';
import bcrypt from 'bcryptjs';
import Post from './Post';
import BaseEntity from './Entity';
import Like from './Like';
import { Expose } from 'class-transformer';

@Entity('users')
export class User extends BaseEntity {
  @Index()
  @Column()
  identifier: string;

  @Index()
  @IsEmail(undefined, { message: '이메일 주소가 잘못되었습니다.' })
  @Length(1, 255, { message: '이메일 주소는 비워둘 수 없습니다.' })
  @Column()
  email: string;

  @Index()
  @Length(3, 32, { message: '사용자 이름은 3자 이상이어야 합니다.' })
  @Column()
  nickname: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  authority: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column()
  @Length(6, 255, { message: '비밀번호는 6자리 이상이어야 합니다.' })
  password: string;

  @Column({ nullable: true })
  imageUrn: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Like, (like) => like.user)
  likes: Like[];

  @Expose()
  get imageUrl(): string {
    return this.imageUrn ? `/images/${this.imageUrn}` : 'https://www.gravatar.com/avatar?d=mp&f=y';
  }

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 6);
  }
}
