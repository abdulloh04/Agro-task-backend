import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { LocationService } from './location.service';
import { RegionEntity } from "./entities/region.entity";
import { DistrictEntity } from "./entities/district.entity";
import { Public } from "../../decorator/public.route.decorator";

@Resolver(() => RegionEntity)
export class LocationResolver {

    constructor(private readonly locationService: LocationService) {}

    @Public()
    @Query(returns => [RegionEntity])
    findRegion() {

        return this.locationService.findRegion();
    
    }

    @Public()
    @Query(returns => [DistrictEntity])
    async findDist(@Args('id', { type: () => Int }) id: number) {

        return await this.locationService.findDist(id);
    
    }

}
