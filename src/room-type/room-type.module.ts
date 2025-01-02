import { Module } from '@nestjs/common';
import { RoomTypeService } from './room-type.service';
import { RoomTypeController } from './room-type.controller';
import { UserAccountModule } from 'src/user-account/user-account.module';
import { UserAccountService } from 'src/user-account/user-account.service';


@Module({
  imports:[UserAccountModule],
  controllers: [RoomTypeController],
  providers: [RoomTypeService,UserAccountService],
})
export class RoomTypeModule {}
