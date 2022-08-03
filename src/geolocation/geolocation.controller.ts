import {
  Controller,
  Get,
  Post,
  Query,
  Body,
  Put,
  Req,
  Delete,
  Param,
  ParamData,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateLocationBodyDto } from './dto/CreateLocationBodyDto.dto';
import { GeolocationService } from './geolocation.service';
import errorConst from '../constants/error.constants';

@Controller('geolocation')
export class GeolocationController {
  constructor(private geolocationService: GeolocationService) {}
  @Get('/')
  getLocations(@Query() query: { search?: string }) {
    return { locations: [] };
  }

  @Post('/')
  create(@Body() locationBody: CreateLocationBodyDto) {
    try {
      const location = this.geolocationService.createLocation(locationBody);
      console.log('LOCATION', location);
      return { data: {} };
    } catch (e: any) {
      throw new HttpException(
        e.message || errorConst.ServerErrorMessage,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put('/:id')
  update(@Req() req: Request) {
    try {
      return { data: {} };
    } catch (e) {
      throw new HttpException(
        e.message || errorConst.ServerErrorMessage,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('/:id')
  delete(@Param() params: ParamData) {
    try {
      return { message: 'deleted', data: params };
    } catch (e) {
      throw new HttpException(
        e.message || errorConst.ServerErrorMessage,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
