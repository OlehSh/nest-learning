import { Controller, Get, Put, UseGuards, Request, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthRequest } from '../auth/interfaces/AuthRequest';
import { RoleAuthGuard } from '../auth/role-auth.guard';
import { User } from './user.entity';
import { Roles } from '../decorators/roles.decorator';
import { DeleteResult } from 'typeorm';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req: AuthRequest): Promise<User> {
    const user = await this.userService.getOne({ where: { id: req.user.id } });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }
  @Put('/')
  @UseGuards(JwtAuthGuard)
  async updateProfile(@Request() req: AuthRequest): Promise<User> {
    const { body } = req;
    const { id } = req.user;
    const user = await this.userService.update({ id, ...body } as Partial<User>);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  @Get('/:id')
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  async findById(@Request() req: AuthRequest): Promise<User> {
    const { id } = req.params;
    const user = await this.userService.getOne({ where: { id } });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  @Put('/:id')
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  async updateById(@Request() req: AuthRequest): Promise<User> {
    const { body } = req;
    const { id } = req.params;
    const user = await this.userService.update({ id, ...body } as Partial<User>);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  @Delete('/')
  @UseGuards(JwtAuthGuard)
  async deleteProfile(@Request() req: AuthRequest): Promise<string> {
    const rawRes: DeleteResult = await this.userService.deleteById(req.user.id);
    if (!rawRes.affected) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return 'OK';
  }

  @Delete('/:id')
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  async deleteById(@Request() req: AuthRequest): Promise<string> {
    const rawRes: DeleteResult = await this.userService.deleteById(req.params.id);
    if (!rawRes.affected) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return 'OK';
  }
}
