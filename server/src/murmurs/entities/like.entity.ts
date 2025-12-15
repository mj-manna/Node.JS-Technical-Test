import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Murmur } from './murmur.entity';

@Entity('likes')
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'murmur_id' })
  murmurId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => User, user => user.likes)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Murmur, murmur => murmur.likes)
  @JoinColumn({ name: 'murmur_id' })
  murmur: Murmur;
}
