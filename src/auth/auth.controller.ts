import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentalDto } from './dto/auth-credental.dto';
import { User } from './users.entity';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signup')
    async signUp(@Body(ValidationPipe) authCredental: AuthCredentalDto): Promise<User> {
        return await this.authService.signUp(authCredental);
    }

    @Post('/signin')
    async signIn(@Body(ValidationPipe) authCredental: AuthCredentalDto): Promise<string> {
        return await this.authService.signIn(authCredental)
    }
}
