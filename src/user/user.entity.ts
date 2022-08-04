import { USER_ROLE } from './userConstants';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  firstname: string;

  @Column({ length: 50 })
  lastname: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ select: false, length: 255 })
  password: string;

  @Column({ type: 'varchar', enum: USER_ROLE })
  role: string;

  @CreateDateColumn({ type: 'timestamptz', default: Date.now() })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: Date.now() })
  updatedAt: Date;
}
