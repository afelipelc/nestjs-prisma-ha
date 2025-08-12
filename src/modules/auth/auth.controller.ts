import { Body, Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Public } from '../../core/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public() // para volver la ruta a pública (sin JWT)
  @Post('signup')
  signUp(@Body() createUserDto: CreateUserDto) {    
    return this.authService.createUser(createUserDto);
  }

  @Public() // para volver la ruta a pública (sin JWT)
  @UseGuards(LocalAuthGuard) // LocalAuthGuard se encarga
  // de la validación de la credencial
  @Post('login')
  @HttpCode(HttpStatus.OK)
  signIn(@Request() req) {
    // devolver el JWT del usuario autenticado 
    return this.authService.login(req.user);
  }

  @UseGuards(LocalAuthGuard)
  @Post('logout')
  async logout(@Request() req) {
    return req.logout();
  }
}
