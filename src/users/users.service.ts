import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma.service';
import { User } from '../../generated/prisma';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  // constructor que reciba instancia de PrismaService
  constructor(private prismaService: PrismaService){
  }

  // métodos para registrar usuario y buscar usuario
  async createUser(userData: CreateUserDto) {
    // cifrar la contraseña
    const hash = await bcrypt.hash(userData.password, 12);

    const user = await this.prismaService.user.create({
      data: {
        ...userData,
        password: hash,
      }
    });

    // devolver datos básicos del usuario
    const { id, name, email, username, image } = user;

    // retornamos el registro del usuario
    return { id, name, email, username, image };
  }

  async findByUserName(username: string): Promise<User | null> {
    // buscar un registro donde el username sea el valor
    // recibido en el parámetro username
    return this.prismaService.user.findUnique({
      where: {
        username: username,
      }
    });
  }
}
