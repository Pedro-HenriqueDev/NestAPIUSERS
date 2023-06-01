
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from "bcrypt"
@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService
    ) {}

    login() {
        return "OPA"
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
