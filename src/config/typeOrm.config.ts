import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import appConfig from './env.config';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: appConfig.typeOrmSettings.host,
  port: appConfig.typeOrmSettings.port,
  username: appConfig.typeOrmSettings.username,
  password: appConfig.typeOrmSettings.password,
  database: appConfig.typeOrmSettings.name,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: appConfig.typeOrmSettings.synchronize,
};
