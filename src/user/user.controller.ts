import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDtos } from './dtos/create-user.dtos';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() CreateUserDtos: CreateUserDtos) {
    return this.userService.create(CreateUserDtos)
  }

}
