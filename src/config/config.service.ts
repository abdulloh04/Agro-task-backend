import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

class ConfigService {

    constructor(private env: { [k: string]: string | undefined }) {}

    private getValue(key: string, throwOnMissing = true): string {

        const value = this.env[key];
        if (!value && throwOnMissing) {

            throw new Error(`config error - missing env.${key}`);

        }

        return value;

    }

    public ensureValues(keys: string[]) {

        keys.forEach((k) => this.getValue(k, true));
        return this;

    }

    public isProduction() {

        const mode = this.getValue('MODE', false);
        return mode != 'DEV';

    }

    public getTypeOrmConfig(): TypeOrmModuleOptions {

        const ormConfig = {
            type: this.getValue('DB_TYPE') as any,
            host: this.getValue('DB_HOST'),
            port: parseInt(this.getValue('DB_PORT')),
            username: this.getValue('DB_USER'),
            password: this.getValue('DB_PASSWORD'),
            database: this.getValue('DB_DATABASE'),
            entities: [join(__dirname, `../modules/**/entities/**.entity.{ts,js}`)],
            migrations: [join(__dirname, `src/migration/*.ts`)],
            cli: {
                entitiesDir: 'src/modules',
                migrationsDir: 'src/migrations'
            },
            synchronize: true,
            migrationsRun: false,
            logging: false
        };

        if (this.isProduction()) {

            ormConfig.synchronize = false;
            ormConfig.migrationsRun = false;

        }

        return ormConfig;

    }

}

const configService = new ConfigService(process.env).ensureValues([
    'DB_HOST',
    'DB_PORT',
    'DB_USER',
    'DB_PASSWORD',
    'DB_DATABASE'
]);

export { configService };
