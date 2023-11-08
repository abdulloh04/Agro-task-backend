import { InputType, Field } from '@nestjs/graphql';
import { IsISO8601, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

@InputType()
export class CreateEventInput {

    @IsNumber()
    @IsNotEmpty()
    @Field()
        userId: number;

    @IsString()
    @IsNotEmpty()
    @Field()
        name: string;

    @IsString()
    @IsNotEmpty()
    @Field()
        title: string;

    @IsString()
    @IsNotEmpty()
    @Field()
        desc: string;

    @IsString()
    @IsOptional()
    @Field()
        address: string;

    @IsISO8601({ strict: true })
    @IsNotEmpty()
    @Field()
        startDate: string;

    @IsISO8601({ strict: true })
    @IsNotEmpty()
    @Field()
        endDate: string;

    @IsNumber()
    @IsNotEmpty()
    @Field()
        districtId: number;

}
