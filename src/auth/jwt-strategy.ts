import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Strategy, ExtractJwt } from 'passport-jwt'
import { JwtPayloadInterface } from "./jwt-payload.interface";
import { User } from "./users.entity";
import { UserRepository } from "./users.repository";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'topSecret123',
        });
    }

    async validate(payload: JwtPayloadInterface): Promise<User> {
        const { username } = payload;
        const user = await this.userRepository.findOne({ username });

        if(!user) throw new UnauthorizedException();
        return user;
    }
}