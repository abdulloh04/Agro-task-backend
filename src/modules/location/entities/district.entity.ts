import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { RegionEntity } from "./region.entity";
import { GeneralEntity } from "../../../shared/utils/base.entity";
import { EventEntity } from "../../event/entities/event.entity";
import { Field, ObjectType } from "@nestjs/graphql";

@Entity('districts')
@ObjectType("DistrictType")
export class DistrictEntity extends GeneralEntity {

    @Field({ nullable: true } )
    @Column({ name: "name_ru" })
        nameRu: string;

    @Field({ nullable: true } )
    @ManyToOne(() => RegionEntity, (regions) => regions.districts)
    @JoinColumn( { name: "region_id" } )
        region: RegionEntity;

    @Field((type) => [EventEntity], { nullable: true })
    @OneToMany(() => EventEntity, (event) => event.district)
        event: EventEntity[];

}
