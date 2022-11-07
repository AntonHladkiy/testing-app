import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { DBService } from '../db/db.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly dbService: DBService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async getAuthenticatedUser(username: string, password: string) {
    try {
      const user = await this.dbService.getByUsername(username);
      const isPasswordMatching = await bcrypt.compare(password, user.password);
      if (!isPasswordMatching) {
        throw new HttpException(
          'Wrong credentials provided',
          HttpStatus.BAD_REQUEST,
        );
      }
      user.password = undefined;
      return user;
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public getCookieForUser(userId: number) {
    const token = this.jwtService.sign({ userId: userId });
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get<number>(
      'auth.expiration_time',
    )}`;
  }

  public getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }
}
