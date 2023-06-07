import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../../src/app.controller';
import { AppService } from '../../src/app.service';
import { BadRequestExceptionTest } from 'test/errors/errors';

describe("App controller", () => {
    let AppControllerTest: AppController;
    let AppServiceTest: AppService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AppController],
            providers: [
                {
                    provide: AppService,
                    useValue: {
                        getHello: jest.fn().mockResolvedValue("Hello World!")
                    }
                }
            ]
        }).compile();

        AppControllerTest =  module.get<AppController>(AppController);
        AppServiceTest = module.get<AppService>(AppService)
    })

    it("should controller is defined", ()=> {
        expect(AppController).toBeDefined();
    })

    describe("Home", () => {
        it("shold Return Hello World!", async () => {
            const result = await AppControllerTest.getHello()

            expect(AppServiceTest.getHello).toHaveBeenCalledTimes(1)
            expect(result).toBe("Hello World!")
        })

        // it("shold return error 500", () => {
        //     const result = AppControllerTest.getHello()

        //     expect(result).rejects.toThrowError()
        // })

        // it("shold return error",async () => {
        //     const error = jest.spyOn(AppServiceTest, "getHello").mockRejectedValueOnce()

        //     expect(error).toBe("")
        // })
    })

})