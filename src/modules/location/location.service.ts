import { Injectable } from '@nestjs/common';
import { RegionEntity } from "./entities/region.entity";
import { DistrictEntity } from "./entities/district.entity";

@Injectable()
export class LocationService {

    async findRegion() {

        return await RegionEntity.find()
    
    }

    async findDist(id: number) {

        return await DistrictEntity.find({
            where: {
                region: {
                    id
                }
            }
        })
    
    }

}
