import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '../Entity/Book.entity';

@Injectable()
export class BooksService {
  constructor(@InjectRepository(Book) private books: Repository<Book>) {}

  findAll() {
    return this.books.find();
  }

  findOne(id: number) {
    return this.books.findOneBy({ id });
  }

  create(book: Omit<Book, 'id'>) {
    return this.books.save(book);
  }

  update(id: number, book: Partial<Book>) {
    return this.books.update(id, book);
  }

  remove(id: number) {
    return this.books.delete(id);
  }
}
