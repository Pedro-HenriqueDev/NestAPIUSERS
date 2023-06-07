import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class LoginRequestBody {
    @IsEmail()
    email: string

    @IsString()
    password: string
}