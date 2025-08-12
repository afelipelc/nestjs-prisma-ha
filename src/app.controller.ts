import { Controller, Get, HttpCode, HttpStatus, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './core/decorators/public.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  getHello(): string {
    // "delegar" la respuesta al servicio
    return this.appService.getHello();
  }

  @Get('profile')
  @HttpCode(HttpStatus.OK)
  getProfile(@Request() req) {
    return req.user;
  }
}
