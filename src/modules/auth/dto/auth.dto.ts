import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator";

@InputType()
export class AuthDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(30)
    @Field(() => String, { nullable: false })
        username: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @IsStrongPassword()
    @Field(() => String, { nullable: false })
        password: string;

}
