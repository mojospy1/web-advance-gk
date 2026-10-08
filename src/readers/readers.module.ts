import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reader } from '../Entity/Reader.entity';
import { ReadersController } from './readers.controller';
import { ReadersService } from './readers.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Reader]), AuthModule],
  controllers: [ReadersController],
  providers: [ReadersService],
})
export class ReadersModule {}
