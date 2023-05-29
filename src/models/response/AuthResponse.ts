import { AuthUser } from '../AuthUser';
import { UserSmall } from '../UserSmall';

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  authUser: AuthUser;
  user?: UserSmall;
  friends?: UserSmall[]
}

