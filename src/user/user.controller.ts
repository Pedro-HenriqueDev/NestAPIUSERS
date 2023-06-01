import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDtos } from './dtos/create-user.dtos';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @IsPublic()
  create(@Body() CreateUserDtos: CreateUserDtos) {
    return this.userService.create(CreateUserDtos)
  }

  @Get()
  profile(@CurrentUser() user: User) {
    return user;
  }

}
