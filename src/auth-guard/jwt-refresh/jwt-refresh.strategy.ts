import {Injectable} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {JwtModel} from '../jwt/jwt.auth-guard';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor() {
        super({jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'), ignoreExpiration: false, secretOrKey: 'bokyo-supersuper-secret'});
    }

    async validate(payload : JwtModel) {
        console.log(payload);
        return payload;
    }
}
