import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [PrismaService, UsersService],
  exports: [ UsersService ], // lo exportamos para usarlo en otros módulos
})
export class UsersModule {}
