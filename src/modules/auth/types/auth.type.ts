import { Field, ObjectType } from "@nestjs/graphql";
import { BaseType } from "../../../shared/utils/base.type";

@ObjectType("AuthResponseType")
export class AuthResponseType {

    @Field()
        id: number;

    @Field()
        username: string;

    @Field()
        accessToken: string;

}

@ObjectType("LoginType")
export class LoginType extends BaseType {

    @Field(() => AuthResponseType, { nullable: true })
        data: AuthResponseType;
    
}