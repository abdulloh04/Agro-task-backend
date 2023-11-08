import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {

    @Field(() => Int)
        exampleField: number;

}
