import { InputType, Field } from '@nestjs/graphql';
import { IsISO8601, IsNumber, IsOptional } from "class-validator";

@InputType()
export class FindInput {

    @IsISO8601()
    @IsOptional()
    @Field({ nullable: true })
        startDate: string

    @IsISO8601()
    @IsOptional()
    @Field({ nullable: true })
        endDate: string;

    @IsNumber()
    @IsOptional()
    @Field({ nullable: true })
        regionId: number;

    @IsNumber()
    @IsOptional()
    @Field()
        perPage: number

    @IsNumber()
    @IsOptional()
    @Field()
        page: number

}
