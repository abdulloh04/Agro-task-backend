import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationResolver } from './location.resolver';
import { TypeOrmModule } from "@nestjs/typeorm";
import { RegionEntity } from "./entities/region.entity";
import { DistrictEntity } from "./entities/district.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            RegionEntity, DistrictEntity
        ])
    ],
    providers: [LocationResolver, LocationService]
})
export class LocationModule {}
