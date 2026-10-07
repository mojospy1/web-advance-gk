import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('borrowed_records')
export class BorrowedRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  bookId: number;

  @Column({ type: 'int' })
  readerId: number;

  @Column({ type: 'datetime' })
  borrowedAt: Date;

  @Column({ type: 'datetime', nullable: true })
  returnedAt: Date | null;
}
