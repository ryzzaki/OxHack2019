"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
dotenv.config();
const appConfig = {
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
exports.default = appConfig;
//# sourceMappingURL=env.config.js.map