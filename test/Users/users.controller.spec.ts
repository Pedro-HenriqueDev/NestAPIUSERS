import { Test, TestingModule } from "@nestjs/testing"
import { UserController } from "../../src/user/user.controller"
import { UserService } from "../../src/user/user.service"
import { createNewUser, usersMock } from "../mock/users-mock.controller"
import { PrismaModule } from "../../src/prisma/prisma.module"
import { BadRequestException, InternalServerErrorException, NotFoundException } from "@nestjs/common"


describe("FindAll", () => {
    let UserControllerTest: UserController
    let UserServiceTest: UserService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [PrismaModule],
            controllers: [UserController],
            providers: [{
                provide: UserService,
                useValue: {
                    findAll: jest.fn().mockResolvedValue(usersMock),
                    create: jest.fn().mockResolvedValue(createNewUser)
                }
            }],

        }).compile()

        UserControllerTest = module.get<UserController>(UserController)
        UserServiceTest = module.get<UserService>(UserService)
    })

    describe("Create", () => {
        it("should response Array Users", async () => {
            // Arrange =>  Prepara variáveis

            // Act => Roda os testes
            const result = await UserControllerTest.findAll()
            console.log(result)
            // Assert => Expectativas
            expect(result).toBeDefined()
            expect(typeof result).toBe("object")
            expect(result).toEqual(usersMock)
            expect(UserServiceTest.findAll).toHaveBeenCalledTimes(1)
        })

        it("should throw Internal Server Error", async () => {
            jest.spyOn(UserServiceTest, "findAll").mockRejectedValue(new Error());

            expect(UserControllerTest.findAll()).rejects.toEqual(new InternalServerErrorException())
            expect(UserControllerTest.findAll()).rejects.toThrowError()
        })
    })


    describe("Create", () => {
        it("shoul create new User", async () => {
            const result = await UserControllerTest.create(createNewUser)

            expect(result).toBe(createNewUser);
            expect(result).toBeDefined();
            expect(UserServiceTest.create).toHaveBeenCalledTimes(1);
        })

        it("should return Internal server Error", () => {
            jest.spyOn(UserServiceTest, "create").mockRejectedValue(new Error());

            expect(UserControllerTest.create(createNewUser)).rejects.toEqual(new InternalServerErrorException())
            expect(UserControllerTest.create(createNewUser)).rejects.toThrowError()
        })
    })

    describe("Profile", () => {
        it("should return object user", async () => {
            const result = await UserControllerTest.profile(usersMock[0])

            expect(result).toBeDefined()
            expect(typeof result).toEqual("object")
            expect(result).toEqual(usersMock[0])
        })

        it("should return Internal Server Error", () => {
            expect(UserControllerTest.profile(undefined)).toBeDefined()
            expect(UserControllerTest.profile(undefined)).toEqual(new NotFoundException("User not Found"))
        })
    })
})