import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { BorrowedRecordsService } from './borrowed-records.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('borrowed-records')
@UseGuards(JwtAuthGuard)
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
