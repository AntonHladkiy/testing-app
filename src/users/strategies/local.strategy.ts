import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { UsersService } from '../users.service';
import { User } from '../../db/schemas/user-schema';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      usernameField: 'username',
    });
  }

  async validate(username: string, password: string): Promise<User> {
    return this.usersService.getAuthenticatedUser(username, password);
  }
}
