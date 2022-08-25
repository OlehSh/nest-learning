import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
@Injectable()
export class RoleAuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log('CONTEXT ==========', request.user);
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    return roles.includes(request.user.role);
    // console.log('AuthGuard ', context.switchToHttp().getRequest().user);
  }
}
