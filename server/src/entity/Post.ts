import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ nullable: true})
    createdAt?: string
    @Column({ nullable: true})
    updatedAt?: string
    @Column()
    title: string
    @Column({ nullable: true})
    subtitle?: string
    @Column()
    content: string
    @Column()
    status: string
    @Column({ nullable: true})
    tag?: string
    @Column({ nullable: true})
    like?: string
    @Column({ nullable: true})
    comment?: string
  }
  