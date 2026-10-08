import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { ReadersService } from './readers.service';
import { Reader } from '../Entity/Reader.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@Controller('readers')
@UseGuards(JwtAuthGuard)
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
  @UseGuards(RolesGuard)
  @Roles('admin')
  remove(@Param('id', ParseIntPipe) id: number) { return this.readersService.remove(id); }
}
