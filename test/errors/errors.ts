import { BadRequestException, InternalServerErrorException } from '@nestjs/common/exceptions';

export class BadRequestExceptionTest extends BadRequestException {
    message: "Bad Request"
}

export class InternalServerErrorTest extends InternalServerErrorException {
    message: "Internal Server Error"
}