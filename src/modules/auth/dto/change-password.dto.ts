import { InputType, Field } from '@nestjs/graphql';
import { AuthDto } from "./auth.dto";

@InputType()
export class ChangePasswordDto extends AuthDto {

    @Field(() => String, { nullable: false })
        repeatPssword: string;

}
