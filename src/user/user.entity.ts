import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ type: 'smallint' })
  role: number;
}
