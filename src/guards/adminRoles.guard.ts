import {
    CanActivate,
    ExecutionContext,
    Injectable,
    BadRequestException,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { UserAccountService } from '../user-account/user-account.service';
  import { Request } from 'express';
  
  @Injectable()
  export class AdminGuard implements CanActivate {
    constructor(private readonly userService: UserAccountService) {}
  
    canActivate(
      context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
      const request = context.switchToHttp().getRequest<Request>();
      return this.validateRequest(request);
    }
  
    private async validateRequest(request: Request): Promise<boolean> {
      const { userId } = request.body;
  
      if (!userId) {
        throw new BadRequestException('Username is required');
      }
  
      const user = await this.userService.findOneById(userId);
  
      if (!user) {
        throw new BadRequestException('User does not exist');
      }
  
      if (user.role !== 'Admin') {
        throw new BadRequestException('Access denied: Admin role required');
      }
  
      return true;
    }
  }
  