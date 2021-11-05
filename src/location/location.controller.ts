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
} from '@nestjs/common';
import { Request } from 'express';
import { CreateLocationDto } from './dto/CreateLocation.dto';

@Controller('location')
export class LocationController {
  @Get('/')
  getLocations(@Query() query: { search?: string }) {
    return { locations: [] };
  }

  @Post('/')
  add(@Body() locationBody: CreateLocationDto) {
    return { data: {} };
  }

  @Put('/:id')
  update(@Req() req: Request) {
    return { data: {} };
  }

  @Delete('/:id')
  delete(@Param() params: ParamData) {
    return { message: 'deleted', data: params };
  }
}
