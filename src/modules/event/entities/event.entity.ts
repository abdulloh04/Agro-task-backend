import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { GeneralEntity } from "../../../shared/utils/base.entity";
import { UserEntity } from "../../user/entities/user.entity";
import { Field, ObjectType } from "@nestjs/graphql";
import { DistrictEntity } from "../../location/entities/district.entity";
import { ViewsEventEntity } from "./views-event.entity";

@Entity('events')
@ObjectType("EventType")
export class EventEntity extends GeneralEntity {

    @Field({ nullable: true } )
    @Column({ name: "event_name" })
        eventName: string;

    @Field({ nullable: true } )
    @Column({ name: "event_title" })
        eventTitle: string;

    @Field({ nullable: true } )
    @Column({ name: "event_description", type: "text" })
        eventDescription: string;

    @Field({ nullable: true } )
    @Column({ name: "event_address", nullable: true })
        eventAddress: string;

    @Field({ nullable: true } )
    @Column({ name: "event_start_date" })
        eventStartDate: Date;

    @Field({ nullable: true } )
    @Column({ name: "event_end_date" })
        eventEndDate: Date;

    @Field({ nullable: true } )
    @Column({ name: "view_count", default: 0 })
        viewCount: number;

    @Field(() => DistrictEntity, { nullable: true })
    @ManyToOne(() => DistrictEntity, (dist) => dist.event)
    @JoinColumn({ name: "district_id" })
        district: DistrictEntity;

    @Field(() => UserEntity, { nullable: true })
    @ManyToOne(() => UserEntity, (user) => user.events)
    @JoinColumn({ name: "user_id" } )
        user: UserEntity;

    @Field((type) => [ViewsEventEntity], { nullable: true })
    @OneToMany(() => ViewsEventEntity, (view) => view.event, { onDelete: "CASCADE" })
        views: ViewsEventEntity;

}
