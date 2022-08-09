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
  UseGuards,
} from '@nestjs/common';
import { AuthRequest } from '../auth/interfaces/AuthRequest';
import { CreateLocationBodyDto } from './dto/CreateLocationBodyDto.dto';
import { GeolocationService } from './geolocation.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import errorConst from '../constants/error.constants';

@Controller('geolocation')
export class GeolocationController {
  constructor(private geolocationService: GeolocationService) {}
  @Get('/')
  @UseGuards(JwtAuthGuard)
  getLocations(@Query() query: { fields?: string; distance?: string; point: string }, @Req() req: AuthRequest) {
    try {
      const fields = query.fields ? JSON.parse(query.fields) : null;
      const { distance, point } = query;
      const [long, lat] = JSON.parse(point);
      return this.geolocationService.find(
        fields,
        `ST_DWithin(st_makepoint(${long}, ${lat}), location, ${distance}) = true`,
      );
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

  @Put('/:id')
  @UseGuards(JwtAuthGuard)
  update(@Req() req: AuthRequest) {
    try {
      return { data: {} };
    } catch (e) {
      throw new HttpException(e.message || errorConst.ServerErrorMessage, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  delete(@Param() params: ParamData) {
    try {
      return { message: 'deleted', data: params };
    } catch (e) {
      throw new HttpException(e.message || errorConst.ServerErrorMessage, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
