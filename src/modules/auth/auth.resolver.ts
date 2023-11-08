import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UserEntity } from "../user/entities/user.entity";
import { AuthDto } from "./dto/auth.dto";
import { RegisterDto } from "./dto/register.dto";
import { BaseResponse } from "../../shared/utils/base.response";
import { IAuth } from "./auth.interface";
import { LoginType } from "./types/auth.type";
import { Public } from "../../decorator/public.route.decorator";

@Resolver(UserEntity)
export class AuthResolver {

    constructor(private readonly authService: AuthService) {}

    @Public()
    @Mutation(returns => UserEntity)
    login(@Args('input') input: AuthDto): Promise<BaseResponse<IAuth>> {

        return this.authService.login(input);

    }
    @Public()
    @Mutation(returns => LoginType)
    async register(@Args('input') input: RegisterDto): Promise<BaseResponse<IAuth>> {

        return await this.authService.register(input);
    
    }

    // @Mutation(returns => any)
    // changePassword(@Args('input') input: ChangePasswordDto) {
    //
    //     // return this.authService.remove(input);
    //
    // }

}
