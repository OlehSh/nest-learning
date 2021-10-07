import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import conf from './config/env';

const { pg } = conf;
console.log(pg);
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      ...pg,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
