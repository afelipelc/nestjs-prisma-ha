import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // método para registrar el usuario
  async createUser(userData: CreateUserDto) {
    return this.usersService.createUser(userData);
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByUserName(username);

    // si no existe usuario, crear excepción
    if (!user) {
      throw new UnauthorizedException();
    }

    // validar la contraseña que debe estar cifrada
    const isMatch = await bcrypt.compare(pass, user.password);

    // si no coincide, crear excepción
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    
    const { password, ...result } = user;
    // TODO: Generate a JWT and return it here
    // instead of the user object
    return result;
  }

  // método que genera el JWT
  async login(user: any) {
    // objeto que irá en el JWT
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
