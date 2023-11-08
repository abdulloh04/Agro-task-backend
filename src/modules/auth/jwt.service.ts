import { ServiceExceptions } from "../../shared/exceptions/service.exception";
import { Injectable, Logger } from '@nestjs/common';
import { JwtService as Jwt } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { JwtAccessTokenDto } from "./dto/jwt.dto";

@Injectable()
export class JwtService {

    private logger = new Logger('JwtService');
    private readonly jwt: Jwt;

    constructor(jwt: Jwt) {

        this.jwt = jwt;

    }

    // Decoding the JWT Token
    public decode(token: string): any {

        return this.jwt.decode(token, null);

    }

    // Generate JWT Token
    public generateToken(payload: any): string {

        return this.jwt.sign(payload);

    }

    // Validate User's password
    public isPasswordValid(password: string, userPassword: string): boolean {

        return bcrypt.compareSync(password, userPassword);

    }

    // Encode User's password
    public encodePassword(password: string): string {

        const salt: string = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);

    }

    // Validate JWT Token, throw forbidden error if JWT Token is invalid
    public async verify(token: string): Promise<any> {

        return await this.jwt.verifyAsync(token);

    }

    generateJwt(payload: any): JwtAccessTokenDto {

        try {

            const dto: JwtAccessTokenDto = new JwtAccessTokenDto();
            dto.accessToken = this.generateToken(payload);
            return dto

        } catch (e) {

            ServiceExceptions.handle(e, 'JwtService', 'generateJwt()');
            this.logger.error(e);
            return null

        }

    }

}
