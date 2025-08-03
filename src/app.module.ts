import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import appConfig from './config/app.config';
import { PrismaModule } from './prisma/prisma.module';
import { RoomModule } from './room/room.module';
import { OwnerModule } from './owner/owner.module';
import { ItemModule } from './item/item.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV}.local`, `.env.${process.env.NODE_ENV}`, '.env'],
      expandVariables: true,
      cache: true,
      load: [appConfig],
    }),
    PrismaModule,
    RoomModule,
    OwnerModule,
    ItemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
