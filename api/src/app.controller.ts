import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { DemandDto, LoadDto } from './demand/interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post("/demands")
  createDemand(@Body() data: DemandDto) {
    return this.appService.createDemand(data);
  }

  @Post("/load")
  loadProperties(@Body() data: LoadDto) {
    return this.appService.loadProperties(data);
  }
}
