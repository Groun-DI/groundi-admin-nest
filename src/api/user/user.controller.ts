import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard, JwtModel } from 'src/auth-guard/jwt/jwt.auth-guard';
import { UserService } from './user.service';
import { CenterAdmins as CenterAdminsModel } from '@prisma/client';
import { User } from '../../decorators/user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('/user')
export class UserController {
  constructor(private readonly memberService: UserService) { }

  @Get()
  getMember(@User() user: JwtModel): Promise<CenterAdminsModel> {
    return this.memberService.getMember(user.id);
  }
}