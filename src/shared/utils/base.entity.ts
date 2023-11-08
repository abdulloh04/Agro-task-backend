import {
    BaseEntity,
    CreateDateColumn, PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType("GeneralType")
export abstract class GeneralEntity extends BaseEntity {

    @Field({ nullable: true } )
    @PrimaryGeneratedColumn()
        id: number;

    @Field({ nullable: true } )
    @CreateDateColumn({ type: 'timestamp without time zone', name: 'created_at' })
        createdAt: Date;

    @Field({ nullable: true } )
    @UpdateDateColumn({ type: 'timestamp without time zone', name: 'updated_at' })
        updatedAt: Date;
  
}
