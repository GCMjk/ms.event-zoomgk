import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { EventMSG } from '@common/constants';
import { EventService } from './event.service';
import { EventDTO } from './dto/event.dto';

@Controller()
export class EventController {
    constructor(
        private readonly _eventService: EventService
    ) {}

    @MessagePattern(EventMSG.CREATE)
    create(@Payload() { userId, eventDTO }: { userId: string, eventDTO: EventDTO }) {
        return this._eventService.create(userId, eventDTO);
    }

    @MessagePattern(EventMSG.FIND_ALL)
    findAll() {
        return this._eventService.findAll();
    }

    @MessagePattern(EventMSG.FIND_ONE)
    findOne(@Payload() id: string) {
        return this._eventService.findOne(id);
    }

    @MessagePattern(EventMSG.UPDATE)
    update(@Payload() { id, eventDTO }: { id: string, eventDTO: EventDTO }) {
        return this._eventService.update(id, eventDTO);
    }

    @MessagePattern(EventMSG.DELETE)
    delete(@Payload() id: string) {
        return this._eventService.delete(id);
    }

    @MessagePattern(EventMSG.ADD_GUEST)
    addGuestToEvent(
        @Payload() { eventId, guestId }: { eventId: string, guestId: string }
    ) {
        return this._eventService.addGuestToEvent(eventId, guestId);
    }

}