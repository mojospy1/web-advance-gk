import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BorrowedRecord } from '../Entity/BorrowedRecord.entity';
import { Book } from '../Entity/Book.entity';
import { Reader } from '../Entity/Reader.entity';
import { BorrowedRecordsController } from './borrowed-records.controller';
import { BorrowedRecordsService } from './borrowed-records.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([BorrowedRecord, Book, Reader]), AuthModule],
  controllers: [BorrowedRecordsController],
  providers: [BorrowedRecordsService],
})
export class BorrowedRecordsModule {}
