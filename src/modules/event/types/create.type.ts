import { Field, ObjectType } from "@nestjs/graphql";
import { BaseType } from "../../../shared/utils/base.type";

@ObjectType("voidType")
export class voidType extends BaseType {

    @Field(() => String, { nullable: true })
        data: null;
  
}