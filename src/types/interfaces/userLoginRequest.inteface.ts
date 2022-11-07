import { Request } from 'express';
import { User } from '../../db/schemas/user-schema';

interface UserLoginRequest extends Request {
  user: User;
}

export default UserLoginRequest;
