import { Entity, Column, OneToMany } from "typeorm";
import { GeneralEntity } from "../../../shared/utils/base.entity";
import { DistrictEntity } from "./district.entity";
import { Field, ObjectType } from "@nestjs/graphql";

@Entity('regions')
@ObjectType("RegionType")
export class RegionEntity extends GeneralEntity {

    @Field({ nullable: true } )
    @Column({ name: "name_ru" })
        nameRu: string;

    @Field((type) => [DistrictEntity])
    @OneToMany(() => DistrictEntity, (districts) => districts.region, { nullable: true })
        districts: DistrictEntity[];

}
