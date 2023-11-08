import { GqlExecutionContext } from "@nestjs/graphql";
import { JwtService as Jwt } from '@nestjs/jwt';
import { MyError } from '../shared/utils/error';
import { Reflector } from '@nestjs/core';
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    Logger,
    UnauthorizedException
} from '@nestjs/common';
import { ServiceExceptions } from "../shared/exceptions/service.exception";
import { JsonWebTokenError, NotBeforeError, TokenExpiredError } from "jsonwebtoken";

@Injectable()
export class VerifyGuard implements CanActivate {

    private readonly jwt: Jwt;
    private reflector: Reflector;

    private logger = new Logger('JwtService');

    constructor(jwt: Jwt) {

        this.jwt = jwt;
        this.reflector = new Reflector();
    
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const ctx = GqlExecutionContext.create(context);
        const { req } = ctx.getContext();

        const isPublic = await this.reflector.get<Promise<boolean>>(
            'isPublic',
            context.getHandler()
        );

        if (isPublic) {

            return true;

        }

        const authorization: string =
            req.headers.authorization || req.headers['authorization'];
        const { ip, method, originalUrl } = req;

        if (!authorization) {

            const errMsg = MyError.getErrorByLang(MyError.INVALID_TOKEN).errorMessage;
            const errCombine = `${errMsg} [${method}] [${originalUrl}] [${ip}]`;
            throw new UnauthorizedException(errCombine);

        }

        const bearer: string[] = authorization.split(' ');

        if (!bearer || bearer.length < 2) {

            const errMsg = MyError.getErrorByLang(MyError.INVALID_TOKEN).errorMessage;
            const errCombine = `${errMsg} [${method}] [${originalUrl}] [${ip}]`;
            throw new UnauthorizedException(errCombine);

        }

        const token: string = bearer[1];

        const { id, username } = await this.validate({
            token
        });

        req.id = id
        req.username = username

        return true;

    }

    public async validate({ token }): Promise<any> {

        try {

            return await this.jwt.verifyAsync(token);

        } catch (e) {

            ServiceExceptions.handle(e, 'verify.guard', 'validate()');

            if (e instanceof TokenExpiredError) {

                return {
                    errId: MyError.getErrorIdByError(MyError.TOKEN_EXPIRED),
                    userId: 0
                };

            } else if (e instanceof NotBeforeError) {

                return {
                    errId: MyError.getErrorIdByError(MyError.TOKEN_EXPIRED),
                    userId: 0
                };

            } else if (e instanceof JsonWebTokenError) {

                return {
                    errId: MyError.getErrorIdByError(MyError.TOKEN_EXPIRED),
                    userId: 0
                };

            } else {

                this.logger.error(`Other JWT verify err: ${JSON.stringify(e)}`);
                return {
                    errId: MyError.getErrorIdByError(MyError.TOKEN_EXPIRED),
                    userId: 0
                };

            }

        }

    }

}
