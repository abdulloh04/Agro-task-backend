import { Process, Processor } from "@nestjs/bull";
import { Injectable, Logger } from "@nestjs/common";
import { Job } from 'bull';
import { EventEntity } from "./entities/event.entity";
import { ViewsEventEntity } from "./entities/views-event.entity";
import { DistrictEntity } from "../location/entities/district.entity";
import { CreateEventInput } from "./dto/create-event.input";
import { UserEntity } from "../user/entities/user.entity";
import { getManager, Repository } from "typeorm";

@Injectable()
@Processor('event')
export class EventProcessor {
    
    private readonly logger = new Logger(EventProcessor.name);

    @Process('create')
    async createEvent(job: Job): Promise<void> {

        try {
            
            const {
                userId, name, desc, districtId,
                endDate, startDate, address, title
            } : CreateEventInput = job.data

            const dist: DistrictEntity = await DistrictEntity.findOne({
                where: { id: districtId }
            })
            
            if(!dist) {
                
                throw new Error("Not found district id")
                
            }

            const user: UserEntity = await UserEntity.findOne({
                where: { id: userId }
            })
            
            if(!user) {

                throw new Error("Not found user id")

            }
            
            const event = new EventEntity();

            event.eventName = name
            event.eventDescription = desc
            event.eventTitle = title
            event.eventAddress = address
            event.eventStartDate = new Date(startDate)
            event.eventEndDate = new Date(endDate)
            event.user = user
            event.district = dist
            await event.save()
            
        }catch (e) {

            console.log(e);

        }

    }

    @Process(`update`)
    async updateEvent(job: Job) {

        try {

            const { data } = job

            return EventEntity.update(data.id, data)

        }catch (e) {

            console.error(e.message)

        }

    }

    @Process(`delete`)
    async deleteEvent(job: Job) {

        try {

            const { data } = job

            const event = await EventEntity.findOne({ where: { id: data } })

            return await EventEntity.remove(event)

        }catch (e) {

            console.error(e.message)

        }

    }

    @Process(`view`)
    async viewEvent(job: Job) {

        try {

            const { id, hash } = job.data

            const event = await EventEntity.findOne({
                where: { id: id }
            })

            if(!event) {

                throw new Error("Not found event id: " + id)

            }

            const viewEvent = await ViewsEventEntity.findOne({
                where: { ipHash: hash }
            })

            if(viewEvent) {

                throw new Error("Already exist this ipHash: " + hash)

            }

            const view = new ViewsEventEntity()

            view.event = event
            view.ipHash = hash

            event.viewCount = event.viewCount + 1

            await event.save()
            await view.save()

        }catch (e) {

            console.error(e.message)

        }

    }

}
