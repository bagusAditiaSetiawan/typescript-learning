import { BadRequestException, ConflictException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentalDto } from "./dto/auth-credental.dto";
import { User } from "./users.entity";
import * as bcrypt from "bcrypt";

@EntityRepository(User)
export class UserRepository extends Repository<User>{
    async signUp(authCredental: AuthCredentalDto): Promise<User> {
        const { username, password } = authCredental;
        

        const user= new User();
        user.username = username;
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);
        try{
            return await user.save();  
        }catch(error){
            if(error.code === "23505") throw new ConflictException('username has already exist');

            throw new ConflictException(error);
        }      
    }

    async validatePassword(authCredental: AuthCredentalDto): Promise<string> {
        const {username, password} = authCredental;
        const user = await User.findOne({username});
        if(user && await user.validatePassword(password)){
            return user.username;
        }

        return null;
    }

    async hashPassword(password: string, salt: string): Promise<string> {
        return await bcrypt.hash(password, salt);
    }
}