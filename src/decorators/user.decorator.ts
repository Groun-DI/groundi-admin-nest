import {createParamDecorator, ExecutionContext} from '@nestjs/common';
import { JwtModel } from '../auth-guard/jwt/jwt.auth-guard';

export const User = createParamDecorator((data : unknown, ctx : ExecutionContext): JwtModel => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
},);
