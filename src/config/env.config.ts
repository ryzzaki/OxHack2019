import * as dotenv from 'dotenv';
import { AppConfigInterface } from '../interfaces/appConfig.interface';

dotenv.config();

const appConfig: AppConfigInterface = {
  serverSettings: {
    port: Number(process.env.PORT),
    azureApi: String(process.env.AZURE_ROUTE_MATRIX),
  },
  typeOrmSettings: {
    host: String(process.env.DB_HOST),
    port: Number(process.env.DB_PORT),
    name: String(process.env.DB_NAME),
    username: String(process.env.DB_USERNAME),
    password: String(process.env.DB_PASSWORD),
    synchronize: Boolean(process.env.DB_SYNCHRONIZE),
  },
};

export default appConfig;
