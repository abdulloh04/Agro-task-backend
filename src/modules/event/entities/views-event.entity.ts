import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { EventEntity } from "./event.entity";
import { GeneralEntity } from "../../../shared/utils/base.entity";
import { Field, ObjectType } from "@nestjs/graphql";

@Entity('views_event')
@ObjectType('ViewsEventType')
export class ViewsEventEntity extends GeneralEntity {

    @Field(() => EventEntity, { nullable: true })
    @ManyToOne(() => EventEntity, (event) => event.views, { onDelete: "CASCADE" })
    @JoinColumn({ name: "event_id" })
        event: EventEntity;

    @Field({ nullable: true } )
    @Column()
        ipHash: string;

}
