import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import conf from './config/conf';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(conf.port);
}
void bootstrap();
