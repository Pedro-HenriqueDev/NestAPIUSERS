import { Test, TestingModule } from "@nestjs/testing"
import { UserController } from "../../src/user/user.controller"
import { UserService } from "../../src/user/user.service"
import { createNewUser, usersMock } from "../mock/users-mock.controller"
import { PrismaModule } from "../../src/prisma/prisma.module"
import { BadRequestExceptionTest, InternalServerErrorTest } from "../errors/errors"
import { BadRequestException, InternalServerErrorException } from "@nestjs/common"


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
                    findAll: jest.fn().mockResolvedValue(usersMock)
                }
            }],

        }).compile()

        UserControllerTest = module.get<UserController>(UserController)
        UserServiceTest = module.get<UserService>(UserService)
    })
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
        jest.spyOn(UserControllerTest, "findAll").mockRejectedValue(new Error("Internal Server Error"));

        const result = await UserControllerTest.findAll()

        expect(result).rejects.toThrowError("Internal Server Error")
    })
})

    // describe("Create", () => {
    //     it("shoul create new User", async () => {
    //         const result = await UserControllerTest.create(createNewUser)

    //         expect(result).toBe(createNewUser);
    //         expect(result).toBeDefined();
    //         expect(UserServiceTest.create).toHaveBeenCalledTimes(1);
    //     })

    //     it("should return error, bad Request", () => {
    //         jest.spyOn(UserServiceTest, "create").mockRejectedValueOnce(new BadRequestException({statusCode: 400, message: "ops"}));

    //         const result = UserControllerTest.create(createNewUser)

    //         expect(result).toBeDefined();
    //         expect(result).rejects.toThrowError("ops")
    //     })
    // })