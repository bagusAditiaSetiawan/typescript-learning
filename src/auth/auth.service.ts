import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentalDto } from './dto/auth-credental.dto';
import { JwtPayloadInterface } from './jwt-payload.interface';
import { UserRepository } from './users.repository';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private authRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredental: AuthCredentalDto) {
    return await this.authRepository.signUp(authCredental);
  }

  async signIn(
    authCredental: AuthCredentalDto,
  ): Promise<{ accessToken: string }> {
    const username = await this.authRepository.validatePassword(authCredental);
    if (!username) throw new UnauthorizedException('Invalid Credental');
    const payload: JwtPayloadInterface = { username };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
