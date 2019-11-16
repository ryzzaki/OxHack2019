export interface AppConfigInterface {
    serverSettings: {
        port: number;
    };
    typeOrmSettings: {
        host: string;
        port: number;
        name: string;
        username: string;
        password: string;
        synchronize: boolean;
    };
    jwtSettings: {
        publicKey: string;
        privateKey: string;
    };
}
