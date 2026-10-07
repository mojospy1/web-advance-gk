import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from '../Entity/Book.entity';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  findAll() { return this.booksService.findAll(); }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) { return this.booksService.findOne(id); }

  @Post()
  create(@Body() body: Omit<Book, 'id'>) { return this.booksService.create(body); }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: Partial<Omit<Book, 'id'>>) {
    return this.booksService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) { return this.booksService.remove(id); }
}
