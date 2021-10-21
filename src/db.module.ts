import { Module } from '@nestjs/common';
import { pgProvider } from './providers/pg.provider';

@Module({
  providers: [...pgProvider],
  exports: [...pgProvider],
})
export class DatabaseModule {}
