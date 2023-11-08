import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType("BaseType")
export class BaseType {

    @Field({ nullable: true })
        statusCode: number;

    @Field({ nullable: true })
        message: string;

    @Field({ nullable: true })
        total: string;
  
}