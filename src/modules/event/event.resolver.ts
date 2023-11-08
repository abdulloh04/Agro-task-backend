import { Resolver, Query, Mutation, Args, Int, Context } from "@nestjs/graphql";
import { EventService } from './event.service';
import { EventEntity } from "./entities/event.entity";
import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';
import { Request, Response } from "express";
import { FindInput } from "./dto/find.input";
import { EventFindAllType, EventFindOneType } from "./types/event.type";
import { BaseResponse } from "../../shared/utils/base.response";
import { voidType } from "./types/create.type";
import { Public } from "../../decorator/public.route.decorator";

@Resolver(() => EventEntity)
export class EventResolver {

    constructor(private readonly eventService: EventService) {}

    @Mutation(() => voidType)
    createEvent(@Args('input') input: CreateEventInput) {

        return this.eventService.create(input);

    }

    @Public()
    @Query(() => EventFindAllType)
    async findAll(
        @Args("input") input: FindInput
    ): Promise<BaseResponse<EventEntity[]>> {

        return await this.eventService.findAll(input);

    }

    @Public()
    @Query(() => EventFindOneType)
    findOne(
    @Args('id', { type: () => Int }) id: number
    ) {

        return this.eventService.findOne(id);

    }

    @Mutation(() => voidType)
    updateEvent(
    @Args('input') input: UpdateEventInput
    ) {

        return this.eventService.update(input.id, input);

    }

    @Mutation(() => EventFindOneType)
    disableLocation(
    @Args('id', { type: () => Int }) id: number
    ) {

        return this.eventService.disableLocation(id);

    }

    @Mutation(() => voidType)
    removeEvent(
    @Args('id', { type: () => Int }) id: number
    ) {

        return this.eventService.remove(id);

    }

    @Public()
    @Mutation(() => String)
    async viewEvent(
    @Args("id", { type: () => Int }) id: number,
        @Context() ctx: { req: Request; res: Response }
    ) {

        await this.eventService.viewEvent(
            id, ctx.req.ip, ctx.req.headers['user-agent'], ctx.req.headers['host']
        )

        return 'test'

    }

}
