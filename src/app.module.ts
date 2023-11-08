import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from "./modules/user/user.module";
import { BullModule } from "@nestjs/bull";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { EventModule } from "./modules/event/event.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { configService } from "./config/config.service";
import { AuthModule } from "./modules/auth/auth.module";
import { LocationModule } from "./modules/location/location.module";
import { DashboardModule } from "./modules/dashboard/dashboard.module";
import { APP_GUARD } from "@nestjs/core";
import { VerifyGuard } from "./guard/verify.guard";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.env`,
            isGlobal: true
        }),
        TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            include: [EventModule, UserModule, AuthModule, LocationModule],
            autoSchemaFile: 'schema.gql',
            driver: ApolloDriver
        }),
        JwtModule.register({
            secret: 'JWTSECRETKEY',
            signOptions: { expiresIn: '1d' }
        }),
        BullModule.forRootAsync({
            useFactory: () => ({
                redis: {
                    host: 'localhost',
                    port: 6379
                }
            })
        }),
        AuthModule,
        UserModule,
        EventModule,
        LocationModule,
        DashboardModule
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_GUARD,
            useClass: VerifyGuard
        }
    ]
})
export class AppModule {}
