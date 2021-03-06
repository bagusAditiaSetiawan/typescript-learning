import { createParamDecorator, Req } from "@nestjs/common";
import { User } from "./users.entity";


export const GetUser = createParamDecorator((data, req): User => {
    return req.user;
});