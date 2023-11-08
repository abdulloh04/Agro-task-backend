import { InputType, Field } from '@nestjs/graphql';
import { AuthDto } from "./auth.dto";
import { IsNotEmpty, IsString, MinLength } from "class-validator";

@InputType()
export class RegisterDto extends AuthDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @Field(() => String, { nullable: false })
        repeatPassword: string;

}
