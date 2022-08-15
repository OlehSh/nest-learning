import {
  Controller,
  Get,
  Post,
  Query,
  Body,
  Put,
  Delete,
  Param,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { CreateLocationBodyDto } from './dto/CreateLocationBodyDto.dto';
import { GeolocationService } from './geolocation.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import errorConst from '../constants/error.constants';

@Controller('geolocation')
export class GeolocationController {
  constructor(private geolocationService: GeolocationService) {}
  @Get('/')
  @UseGuards(JwtAuthGuard)
  getLocations(@Query() query: { fields?: string; filter?: string }) {
    try {
      const fields = query.fields ? JSON.parse(query.fields) : undefined;
      const filter = query.filter ? JSON.parse(query.filter) : undefined;
      return this.geolocationService.find(fields, filter);
    } catch (e: any) {
      throw new HttpException(e.message || errorConst.ServerErrorMessage, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('/')
  @UseGuards(JwtAuthGuard)
  async create(@Body() locationBody: CreateLocationBodyDto) {
    try {
      return this.geolocationService.createLocation(locationBody);
    } catch (e: any) {
      throw new HttpException(e.message || errorConst.ServerErrorMessage, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() body: Partial<CreateLocationBodyDto>) {
    try {
      return this.geolocationService.update(id, body);
    } catch (e) {
      throw new HttpException(e.message || errorConst.ServerErrorMessage, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string): Promise<string> {
    try {
      const { affected } = await this.geolocationService.delete(id);
      if (affected === 0) {
        throw new HttpException('Locatiuon not found', HttpStatus.NOT_FOUND);
      }
      return 'OK';
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }
      throw new HttpException(e.message || errorConst.ServerErrorMessage, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
