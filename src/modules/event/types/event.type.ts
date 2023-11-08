import { Field, ObjectType } from "@nestjs/graphql";
import { EventEntity } from "../entities/event.entity";
import { BaseType } from "../../../shared/utils/base.type";

@ObjectType("EventFindAllType")
export class EventFindAllType extends BaseType {

    @Field(() => [EventEntity], { nullable: true })
        data: EventEntity[];

}

@ObjectType("EventFindType")
export class EventFindOneType extends BaseType {

    @Field(() => EventEntity, { nullable: true })
        data: EventEntity;

}