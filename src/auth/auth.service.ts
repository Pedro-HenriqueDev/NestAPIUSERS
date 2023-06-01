import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    
    login() {
        return "OPA"
    }

    validateUser(email: string, password: string) {
        throw new Error('Method not implemented.');
    }
}
