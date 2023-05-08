import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { EVENT } from '@common/models/models';
import { IEvent } from '@common/interfaces/event.interface';
import { EventDTO } from './dto/event.dto';

@Injectable()
export class EventService {

    constructor(
        @InjectModel(EVENT.name) private readonly model: Model<IEvent>
    ) {}

    async create (userId: string, eventDTO: EventDTO): Promise<IEvent> {
        const newEvent = new this.model({
            user: userId,
            ...eventDTO
        });

        return await newEvent.save();
    }

    async findAll (): Promise<IEvent[]> {
        return await this.model.find()
            .populate(['guests', 'user']);
    }

    async findOne (id: string): Promise<IEvent> {
        return await this.model.findById(id)
            .populate(['guests', 'user']);
    }

    async update (id: string, eventDTO: EventDTO): Promise<IEvent> {
        return await this.model.findByIdAndUpdate(
            id,
            eventDTO,
            { new: true }
        ).populate(['guests', 'user']);
    }

    async delete (id: string) {
        await this.model.findByIdAndDelete(id);

        return {
            status: HttpStatus.OK,
            message: 'User deleted successfully'
        }
    }

    async addGuestToEvent(eventId: string, guestId: string): Promise<IEvent> {
        return await this.model.findByIdAndUpdate(
            eventId,
            { $addToSet: { guests: guestId } },
            { new: true }
        ).populate(['guests', 'user']);
    }
}
