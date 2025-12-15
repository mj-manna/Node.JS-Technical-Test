import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Like } from './like.entity';

@Entity('murmurs')
export class Murmur {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ type: 'text' })
  content: string;

  @Column({ name: 'like_count', default: 0 })
  likeCount: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => User, user => user.murmurs)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Like, like => like.murmur)
  likes: Like[];
}