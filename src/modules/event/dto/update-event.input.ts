import { InputType, Field } from '@nestjs/graphql';
import { IsISO8601, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

@InputType()
export class UpdateEventInput {

    @IsNumber()
    @IsNotEmpty()
    @Field()
        id: number
    
    @IsNumber()
    @IsOptional()
    @Field({ nullable: true })
        userId: number;

    @IsString()
    @IsOptional()
    @Field({ nullable: true })
        name: string;

    @IsString()
    @IsOptional()
    @Field({ nullable: true })
        title: string;

    @IsString()
    @IsOptional()
    @Field({ nullable: true })
        desc: string;

    @IsString()
    @IsOptional()
    @Field({ nullable: true })
        address: string;

    @IsISO8601()
    @IsOptional()
    @Field({ nullable: true })
        startDate: Date;

    @IsISO8601()
    @IsOptional()
    @Field({ nullable: true })
        endDate: Date;

    @IsNumber()
    @IsOptional()
    @Field({ nullable: true })
        districtId: number;

}
