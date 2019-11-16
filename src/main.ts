import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import appConfig from './config/env.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(appConfig.serverSettings.port);
}
bootstrap();
