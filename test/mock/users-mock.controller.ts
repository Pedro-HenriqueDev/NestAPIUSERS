import { User } from "@prisma/client";
import { CreateUserDtos } from "../../src/user/dtos/create-user.dtos";

export const usersMock: User[] = [
    {
        email: "ph@gmail.com",
        password: "12345678",
        id: "1111",
        name: "Pedro"
    },
    {
        email: "ph@gmail.com",
        password: "12345678",
        id: "1111",
        name: "Pedro"
    }
]

export const createNewUser = {
    email: "ph1305802@gmail.com",
    password: "12345678",
    name: "predo"
}