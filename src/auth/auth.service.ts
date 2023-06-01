import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from "bcrypt"
import { User } from '@prisma/client';
import { UserPayload } from './models/userPayload';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    login(user: User) {
        const payload: UserPayload = {
            sub: user.id,
            email: user.email,
            name: user.name
        }

        const jwtToken  = this.jwtService.sign(payload);
        
        return {
            access_token: jwtToken
        }
    }

    async validateUser(email: string, password: string) {
        const user = await this.userService.findOneByEmail(email)

        if(user) {
            const isPasswordValid = await bcrypt.compare(password, user.password)

            if(isPasswordValid) {
                return {
                    ...user,
                    password:undefined
                }
            }
        }

        throw new UnauthorizedException({message: "Email or  password  incorrect"})
    }
}
