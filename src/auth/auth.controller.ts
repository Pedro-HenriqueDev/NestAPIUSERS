import { AuthService } from './auth.service';
import { Request ,Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './models/authRequest';

@Controller()
export class AuthController {
    constructor(
        private readonly authService: AuthService
        ) {}

        @Post("login")
        @HttpCode(HttpStatus.OK)
        @UseGuards(LocalAuthGuard)
        login(@Request() req: AuthRequest) {
            console.log(req.user)

            return this.authService.login(req.user) 
        } 
}
