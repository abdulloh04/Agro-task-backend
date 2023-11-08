import { Entity, Column, OneToMany } from "typeorm";
import { GeneralEntity } from "../../../shared/utils/base.entity";
import { EventEntity } from "../../event/entities/event.entity";
import { Field, ObjectType } from "@nestjs/graphql";

@Entity('users')
@ObjectType('UserType')
export class UserEntity extends GeneralEntity {

    @Field({ nullable: true } )
    @Column()
        username: string;

    @Field({ nullable: true } )
    @Column()
        password: string;

    @Field((type) => [EventEntity], { nullable: true })
    @OneToMany(() => EventEntity, (events) => events.user)
        events: EventEntity[];

}
