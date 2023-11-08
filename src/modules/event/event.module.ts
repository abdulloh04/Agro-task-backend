import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { EventEntity } from "./entities/event.entity";
import { ViewsEventEntity } from "./entities/views-event.entity";
import { BullModule } from "@nestjs/bull";
import { EventResolver } from "./event.resolver";
import { EventProcessor } from "./event.processor";

@Module({
    imports: [
        BullModule.registerQueue({
            name: 'event'
        }),
        TypeOrmModule.forFeature([
            EventEntity, ViewsEventEntity
        ])
    ],
    providers: [ EventService, EventResolver, EventProcessor]
})
export class EventModule {}
