import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User } from '../../generated/prisma';

@Injectable()
export class UsersService {
  // constructor que reciba instancia de PrismaService
  constructor(private prismaService: PrismaService){
  }

  // métodos para registra usuario y buscar usuario

  async findByUserName(username: string): Promise<User | null> {
    // temporalmente, devolvemos un registro fake
    return {
      id: "asdasdsa",
      name: "Felipe",
      username: "test",
      email: "test@algo.com",
      password: "aaaaa",
      image: null,
      active: true,
      createdAt: new Date(),
      updatedAt: null,
    }

    // buscar un registro donde el username sea el valor
    // recibido en el parámetro username
    return this.prismaService.user.findUnique({
      where: {
        username: username,
      }
    });
  }
}
