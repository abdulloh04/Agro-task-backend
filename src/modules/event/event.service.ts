import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';
import { InjectQueue } from "@nestjs/bull";
import { Queue } from "bull";
import { InjectRepository } from "@nestjs/typeorm";
import { Between, Repository } from "typeorm";
import { EventEntity } from "./entities/event.entity";
import { errorResponse } from "../../shared/utils/error.response";
import { BaseResponse } from "../../shared/utils/base.response";
import { generateHash, handlePagination, removeNullObject } from "../../shared/utils/helpers";
import { FindInput } from "./dto/find.input";

@Injectable()
export class EventService {

    private logger: Logger = new Logger(EventService.name);

    constructor(
        @InjectRepository(EventEntity)
        private eventRepository: Repository<EventEntity>,
        @InjectQueue('event') private readonly responseQueue: Queue
    ) {
    }

    async create(dto: CreateEventInput): Promise<BaseResponse<null>> {

        try {

            const data: EventEntity = await this.checkUniqueName(dto.name)
            if(data) {

                this.logger.warn(`There is already such a name: [${dto.name}]`);
                throw new HttpException("There is already such a name", HttpStatus.NOT_FOUND);

            }

            await this.responseQueue.add('create', dto);

            return { statusCode: 200, data: null, message: "Successfully created" }

        }catch (e) {

            return errorResponse(e)

        }

    }

    async findAll(dto: FindInput): Promise<BaseResponse<EventEntity[]>> {

        try {

            const {
                startDate, endDate, perPage, page, regionId
            }: FindInput = dto

            const pagination = handlePagination(page, perPage)

            const where = removeNullObject({
                createdAt: startDate && endDate ? Between(startDate, endDate) : null,
                district: regionId ? { region : { id: regionId } } : null
            })

            const [data, total] = await EventEntity.findAndCount({
                where : { ...where },
                skip: pagination.offset, take: pagination.limit,
                relations: ["district", "district.region"]

            })

            return { statusCode: 200, data, message: null, total }
           
        }catch (e) {

            return errorResponse(e)
        
        }
    
    }

    async findOne(id: number): Promise<BaseResponse<EventEntity>> {

        try {

            const data: EventEntity = await this.eventRepository.findOne({
                where: { id },
                relations: ["district", "district.region"]
            })
            if(!data) {

                this.logger.warn(`Event not found: [${id}]`);
                throw new HttpException("Not found Event", HttpStatus.NOT_FOUND);

            }

            return { statusCode: 200, data, message: null }

        }catch (e) {

            return errorResponse(e)

        }
    
    }

    async update(id: number, dto: UpdateEventInput): Promise<BaseResponse<null>> {

        try {

            const data: EventEntity = await this.isOwnEvent(id)
            if(data) {

                this.logger.warn(`Event not found: [${id}]`);
                throw new HttpException("Not found Event", HttpStatus.NOT_FOUND);

            }

            await this.responseQueue.add('update', dto);

            return { statusCode: 200, data: null, message: "Successfully updated" }

        }catch (e) {

            return errorResponse(e)

        }
    
    }

    async remove(id: number): Promise<BaseResponse<null>> {

        try {

            const data: EventEntity = await this.isOwnEvent(id)
            if(data) {

                this.logger.warn(`Not your event: [${id}]`);
                throw new HttpException("Not your event", HttpStatus.NOT_FOUND);

            }
            const exist = await this.isExist(id)
            if(!exist) {

                this.logger.warn(`Event not found: [${id}]`);
                throw new HttpException("Not found Event", HttpStatus.NOT_FOUND);

            }

            await this.responseQueue.add('delete', id);

            return { statusCode: 200, data: null, message: "Successfully deleted" }

        }catch (e) {

            return errorResponse(e)

        }
    
    }

    async viewEvent(id: number, ip: string, host: string, userAgent: string): Promise<void> {

        try {

            const hash: string = generateHash(host, ip, userAgent)

            await this.responseQueue.add('view', { id, hash });
            
        }catch (e) {

            console.log(e);
            
        }

    }
    
    async disableLocation(id: number): Promise<BaseResponse<null>> {

        try {

            const dis: EventEntity = await EventEntity.findOne({
                where: { id }
            })

            dis.district = null
            dis.eventAddress = null
            await dis.save()

            return { statusCode: 200, data: null, message: "Succesfully disable location" }
            
        }catch (e) {

            return errorResponse(e)
        
        }
    
    }

    // *** REPOSITORY *** //

    async checkUniqueName(eventName: string): Promise<EventEntity> {

        return await this.eventRepository.findOne({
            where: { eventName }
        })

    }

    async isOwnEvent(id: number): Promise<EventEntity> {

        return await this.eventRepository.findOne({
            where: {
                user: {
                    id
                }
            }
        })

    }

    async isExist(id: number): Promise<EventEntity> {

        return await this.eventRepository.findOne({
            where: {
                id
            }
        })

    }

}
