import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentalDto } from './dto/auth-credental.dto';
import { UserRepository } from './users.repository';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private authRepository: UserRepository,
    ) {}

    async signUp(authCredental: AuthCredentalDto) {
        return await this.authRepository.signUp(authCredental);
    }

    async signIn(authCredental: AuthCredentalDto) {
        const username =  await this.authRepository.validatePassword(authCredental);
        if(!username) throw new UnauthorizedException("Invalid Credental");
        return username;
    }
}
