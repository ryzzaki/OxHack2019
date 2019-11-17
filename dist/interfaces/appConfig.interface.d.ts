export interface AppConfigInterface {
    serverSettings: {
        port: number;
        azureApi: string;
    };
    typeOrmSettings: {
        host: string;
        port: number;
        name: string;
        username: string;
        password: string;
        synchronize: boolean;
    };
}
