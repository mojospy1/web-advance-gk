import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './Entity/Book.entity';
import { Reader } from './Entity/Reader.entity';
import { BorrowedRecord } from './Entity/BorrowedRecord.entity';
import { BooksModule } from './books/books.module';
import { ReadersModule } from './readers/readers.module';
import { BorrowedRecordsModule } from './borrowed-records/borrowed-records.module';

@Module({
  imports: [
    BooksModule,
    ReadersModule,
    BorrowedRecordsModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql' as const,
        host: config.get<string>('DB_HOST', 'localhost'),
        port: Number(config.get<string>('DB_PORT', '3306')),
        username: config.get<string>('DB_USERNAME', 'root'),
        password: config.get<string>('DB_PASSWORD', ''),
        database: config.get<string>('DB_DATABASE', 'library_db'),
        entities: [Book, Reader, BorrowedRecord],
        synchronize: config.get<string>('DB_SYNCHRONIZE', 'true') === 'true',
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
