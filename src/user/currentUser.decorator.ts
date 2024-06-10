import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import { PrismaService } from '@/prisma/prisma.service';


export const CurrentUser = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      return null;
    }

    const jwtService = new JwtService({ secret: process.env.JWT_SECRET });
    
    const decoded = jwtService.verify(token);

    const prisma = new PrismaService()

    const usersService = new UserService(prisma);

    const user = await usersService.getById(decoded.id)

    return user;
  },
);