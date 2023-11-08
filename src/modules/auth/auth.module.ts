import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserEntity } from "../user/entities/user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { JwtService } from "./jwt.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UserEntity
        ]),
        JwtModule.register({
            secret: 'JWTSECRETKEY',
            signOptions: { expiresIn: '1d' }
        })
    ],
    providers: [AuthResolver, AuthService, JwtService]
})
export class AuthModule {}
