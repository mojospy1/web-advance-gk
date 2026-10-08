import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 254 })
  email: string;

  @Column({ length: 255 })
  password: string;

  @Column({ length: 20, default: 'user' })
  role: string;
}
