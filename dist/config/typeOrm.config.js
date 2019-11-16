"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env_config_1 = require("./env.config");
exports.typeOrmConfig = {
    type: 'postgres',
    host: env_config_1.default.typeOrmSettings.host,
    port: env_config_1.default.typeOrmSettings.port,
    username: env_config_1.default.typeOrmSettings.username,
    password: env_config_1.default.typeOrmSettings.password,
    database: env_config_1.default.typeOrmSettings.name,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: env_config_1.default.typeOrmSettings.synchronize,
};
//# sourceMappingURL=typeOrm.config.js.map