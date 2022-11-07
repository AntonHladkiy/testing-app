import {
  Controller,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import UserLoginRequest from '../types/interfaces/userLoginRequest.inteface';
import { LocalAuthenticationGuard } from './guards/localAuth.guard';
import { UsersService } from './users.service';
import JwtAuthenticationGuard from './guards/jwt-auth.guard';

@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('log-in')
  login(@Req() request: UserLoginRequest, @Res() response) {
    const user = request.user;
    const cookie = this.usersService.getCookieForUser(user.id);
    response.setHeader('Set-Cookie', cookie);
    return response.sendStatus(200);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('log-out')
  async logOut(@Res() response) {
    response.setHeader('Set-Cookie', this.usersService.getCookieForLogOut());
    return response.sendStatus(200);
  }
}
