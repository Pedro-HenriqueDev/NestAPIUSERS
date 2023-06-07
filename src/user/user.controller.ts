import { Body, Controller, Get, InternalServerErrorException, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDtos } from './dtos/create-user.dtos';
import { IsPublic } from '../auth/decorators/is-public.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
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

  @Get("all")
  async findAll() {
    try {
      const users = await this.userService.findAll()
      
      return users
    } catch(err) {
      throw new InternalServerErrorException()
    }
  }

}
