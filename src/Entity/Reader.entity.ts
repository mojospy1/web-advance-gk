import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('readers')
export class Reader {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  name: string;

  @Column({ unique: true, length: 254 })
  email: string;
}
