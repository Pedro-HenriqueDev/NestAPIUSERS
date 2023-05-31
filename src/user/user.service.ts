import { User } from './entities/user.entity';
import { CreateUserDtos } from './dtos/create-user.dtos';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from "bcrypt"
import { BadRequestException } from '@nestjs/common/exceptions';
@Injectable()
export class UserService {
    constructor(
        private readonly prisma: PrismaService
    ) {}

    async create(CreateUserDtos: CreateUserDtos) {

        if(this.findOneByEmail(CreateUserDtos.email) != null){
            throw new BadRequestException("email exist!")
        }
        
        const data = {
            ...CreateUserDtos,
            password: await bcrypt.hash(CreateUserDtos.password.toString() , 10)
        }
        const createdUser = await this.prisma.user.create({data})

        const {password:_, ...res} = createdUser
        return res
    }

    async findOneByEmail(email: string) :Promise<User> {
        const user = await this.prisma.user.findUnique({where:{email}})

        return user
    }

}
