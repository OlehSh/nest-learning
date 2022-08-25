import { Controller, Get, Put, UseGuards, Request, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthRequest } from '../auth/interfaces/AuthRequest';
import { RoleAuthGuard } from '../auth/role-auth.guard';
import { User } from './user.entity';
import { Roles } from '../decorators/roles.decorator';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req: AuthRequest): Promise<User> {
    return this.userService.getOne({ where: { id: req.user.id } });
  }
  @Put('/')
  @UseGuards(JwtAuthGuard)
  updateProfile(@Request() req: AuthRequest): Promise<User> {
    const { body } = req;
    console.log('PUT ///');
    return this.userService.update(body as Partial<User>);
  }

  @Get('/:id')
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  findById(@Request() req: AuthRequest): string {
    console.log('findById ==========', req.user);
    return 'findById';
  }

  @Put('/:id')
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  updateById(): string {
    console.log('updateById ==========');
    return 'updateById';
  }

  @Delete('/')
  @UseGuards(JwtAuthGuard)
  deleteById(): string {
    return 'delete own profile';
  }
}
