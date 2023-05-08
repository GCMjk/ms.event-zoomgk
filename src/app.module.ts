import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventModule } from './event/event.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.development',
    }),
    MongooseModule.forRoot(
      process.env.URI_MONGODB,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    ),
    EventModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
