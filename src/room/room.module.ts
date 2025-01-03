import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { UserAccountModule } from 'src/user-account/user-account.module';
import { UserAccountService } from 'src/user-account/user-account.service';

@Module({
  imports: [UserAccountModule],
  controllers: [RoomController],
  providers: [RoomService, UserAccountService],
})
export class RoomModule {}
