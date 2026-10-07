import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reader } from '../Entity/Reader.entity';

@Injectable()
export class ReadersService {
  constructor(@InjectRepository(Reader) private readers: Repository<Reader>) {}

  findAll() {
    return this.readers.find();
  }

  findOne(id: number) {
    return this.readers.findOneBy({ id });
  }

  create(reader: Omit<Reader, 'id'>) {
    return this.readers.save(reader);
  }

  update(id: number, reader: Partial<Reader>) {
    return this.readers.update(id, reader);
  }

  remove(id: number) {
    return this.readers.delete(id);
  }
}
