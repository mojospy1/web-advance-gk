import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ReadersService } from './readers.service';
import { Reader } from '../Entity/Reader.entity';

@Controller('readers')
export class ReadersController {
  constructor(private readonly readersService: ReadersService) {}

  @Get()
  findAll() { return this.readersService.findAll(); }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) { return this.readersService.findOne(id); }

  @Post()
  create(@Body() body: Omit<Reader, 'id'>) { return this.readersService.create(body); }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: Partial<Omit<Reader, 'id'>>) {
    return this.readersService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) { return this.readersService.remove(id); }
}
