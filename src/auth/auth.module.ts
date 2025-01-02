import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ATStrategy, RTStrategy } from 'src/strategies';
import { PassportModule } from '@nestjs/passport';
import { UserAccountModule } from 'src/user-account/user-account.module';
import { UserAccountService } from 'src/user-account/user-account.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PassportModule, UserAccountModule, JwtModule.register({})],
  providers: [AuthService, RTStrategy, ATStrategy, UserAccountService],
  controllers: [AuthController],
})
export class AuthModule {}
