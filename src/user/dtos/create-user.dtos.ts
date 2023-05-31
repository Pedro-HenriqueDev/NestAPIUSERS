import { IsEmail, IsString, MaxLength, MinLength } from "class-validator"
import { User } from "../entities/user.entity"

export class CreateUserDtos extends User {
    @IsEmail()
    email: string

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    password: string

    @IsString()
    name: string

}