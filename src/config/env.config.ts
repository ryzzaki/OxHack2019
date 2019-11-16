import * as dotenv from 'dotenv';
import { AppConfigInterface } from '../interfaces/appConfig.interface';

dotenv.config();

const appConfig: AppConfigInterface = {
  serverSettings: {
    port: Number(process.env.PORT),
  },
  typeOrmSettings: {
    host: String(process.env.DB_HOST),
    port: Number(process.env.DB_PORT),
    name: String(process.env.DB_NAME),
    username: String(process.env.DB_USERNAME),
    password: String(process.env.DB_PASSWORD),
    synchronize: Boolean(process.env.DB_SYNCHRONIZE),
  },
  jwtSettings: {
    publicKey: String(process.env.JWT_PUBLIC),
    privateKey: String(process.env.JWT_PRIVATE),
  },
};

export default appConfig;
