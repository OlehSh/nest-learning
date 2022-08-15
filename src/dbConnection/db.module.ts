import { Module } from '@nestjs/common';
import { DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => configService.get('db') as DataSourceOptions,
      inject: [ConfigService],
    }),
  ],
  // providers: [],
  // exports: [],
})
export class DatabaseModule {}
