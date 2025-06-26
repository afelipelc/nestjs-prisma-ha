import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    // "delegar" la respuesta al servicio
    return this.appService.getHello();
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
