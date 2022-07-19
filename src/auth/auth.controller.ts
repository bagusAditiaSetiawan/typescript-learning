import { Body, Controller, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentalDto } from './dto/auth-credental.dto';
import { GetUser } from './get-user.decorator';
import { User } from './users.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(
    @Body(ValidationPipe) authCredental: AuthCredentalDto,
  ): Promise<User> {
    return await this.authService.signUp(authCredental);
  }

  @Post('/signin')
  async signIn(
    @Body(ValidationPipe) authCredental: AuthCredentalDto,
  ): Promise<{ accessToken: string }> {
    return await this.authService.signIn(authCredental);
  }

  @Post('/current-user')
  @UseGuards(AuthGuard())
  currentUser(@GetUser() user: User) {
    console.log(user)
    return user;
  }
}
