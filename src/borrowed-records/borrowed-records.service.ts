import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BorrowedRecord } from '../Entity/BorrowedRecord.entity';
import { Book } from '../Entity/Book.entity';
import { Reader } from '../Entity/Reader.entity';

@Injectable()
export class BorrowedRecordsService {
  constructor(
    @InjectRepository(BorrowedRecord)
    private readonly data: Repository<BorrowedRecord>,
    @InjectRepository(Book)
    private readonly books: Repository<Book>,
    @InjectRepository(Reader)
    private readonly readers: Repository<Reader>,
  ) {}

  borrow(bookId?: number, readerId?: number): Promise<BorrowedRecord> {
    if (!bookId || !readerId) {
      throw new BadRequestException('Gửi bookId và readerId dạng số');
    }

    return this.data.save({
      bookId,
      readerId,
      borrowedAt: new Date(),
      returnedAt: null,
    });
  }

  findAll(): Promise<BorrowedRecord[]> {
    return this.data.find();
  }

  async listBorrowedBooks() {
    const [records, books, readers] = await Promise.all([
      this.data.find(),
      this.books.find(),
      this.readers.find(),
    ]);

    return records.map((record) => {
      const dueAt = new Date(record.borrowedAt);
      dueAt.setDate(dueAt.getDate() + 14);

      return {
        book: books.find((book) => book.id === record.bookId)?.title,
        borrowedAt: record.borrowedAt,
        borrower: readers.find((reader) => reader.id === record.readerId)?.name,
        dueAt,
      };
    });
  }
}
