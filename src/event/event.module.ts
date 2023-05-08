import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventController } from './event.controller';
import { EventService } from './event.service';

import { EVENT, GUEST, USER } from '@common/models/models';
import { EventSchema } from './schema/event.schema';
import { GuestSchema } from './schema/guest.schema';
import { UserSchema } from './schema/user.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: EVENT.name,
        useFactory: () => EventSchema.plugin(require('mongoose-autopopulate'))
      },
      {
        name: GUEST.name,
        useFactory: () => GuestSchema
      },
      {
        name: USER.name,
        useFactory: () => UserSchema
      }
    ])
  ],
  controllers: [EventController],
  providers: [EventService]
})
export class EventModule {}
