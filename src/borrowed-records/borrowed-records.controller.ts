import { Body, Controller, Get, Post } from '@nestjs/common';
import { BorrowedRecordsService } from './borrowed-records.service';

@Controller('borrowed-records')
export class BorrowedRecordsController {
  constructor(private readonly service: BorrowedRecordsService) {}

  @Post()
  borrow(@Body() body?: { bookId?: number; readerId?: number }) {
    return this.service.borrow(body?.bookId, body?.readerId);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('books')
  listBorrowedBooks() {
    return this.service.listBorrowedBooks();
  }
}
