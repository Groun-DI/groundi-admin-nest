import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { VerifyUserReq } from '../../dto/verify-user.req';
import { CreateUserReq } from '../../dto/create-user.req';
import { JwtRefreshAuthGuard } from '../../auth-guard/jwt-refresh/jwt-refresh.auth-guard';
import { JwtModel } from '../../auth-guard/jwt/jwt.auth-guard';
import { User } from '../../decorators/user.decorator';
import { TokenRes } from '../../dto/token.res';
import {
  UNAUTHORIZED_TYPE,
  UnauthorizedException,
} from '../../errors/unauthorized.exception';
import { LoginReq } from '../../dto/login.req';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signin')
  async login(@Body() body: LoginReq): Promise<TokenRes> {
    return this.authService.login(body);
  }

  @Post('/signup')
  async signup(@Body() body: CreateUserReq): Promise<TokenRes> {
    return this.authService.createMember(body);
  }

  @Post('/phoneNumber-verify')
  async verifyAuthNumber(@Body() body: VerifyUserReq): Promise<TokenRes> {
    console.log(body);
    return this.authService.verifyMember(body);
  }

  @Get('/:phoneNumber')
  async getAuthNumber(
    @Param('phoneNumber') phoneNumber: string,
  ): Promise<{ message: string }> {
    return this.authService.getAuthCode(phoneNumber);
  }

  @UseGuards(JwtRefreshAuthGuard)
  @Post('/refresh')
  refreshToken(@User() user: JwtModel) {
    if (!user.phoneNumber || !user.adminId)
      throw new UnauthorizedException(UNAUTHORIZED_TYPE.NO_MEMBER);

    return this.authService.refreshToken(
      Number(user.adminId),
      user.email,
      user.phoneNumber,
    );
  }
}
