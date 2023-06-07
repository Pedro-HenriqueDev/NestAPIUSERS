import { User } from './entities/user.entity';
import { CreateUserDtos } from './dtos/create-user.dtos';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from "bcrypt"
import { BadRequestException, InternalServerErrorException } from '@nestjs/common/exceptions';
@Injectable()
export class UserService {
    constructor(
        private readonly prisma: PrismaService
    ) { }

    async create(CreateUserDtos: CreateUserDtos) {
        try {

            if (await this.findOneByEmail(CreateUserDtos.email) != null) {
                throw new BadRequestException("ops")
            }

            const data = {
                ...CreateUserDtos,
                password: await bcrypt.hash(CreateUserDtos.password.toString(), 10)
            }
            const createdUser = await this.prisma.user.create({ data })

            const { password: _, ...res } = createdUser
            return res
        } catch (err) {
            throw new InternalServerErrorException()
        }
    }

    async findOneByEmail(email: string): Promise<User> {
        const user = await this.prisma.user.findUnique({ where: { email } })

        return user
    }

    async findAll(): Promise<User[]> {
        try {

            const users = await this.prisma.user.findMany()

            return users

        } catch (err) {
            throw new InternalServerErrorException({ statusCode: 500, message: "Internal Server Error" })
        }
    }

}
