import { AuthUser } from '../models/AuthUser';
import { AuthResponse } from '../models/response/AuthResponse';
import $api from "../http";
import { AxiosResponse } from "axios";

class AuthUserService {
  static async fetchUsers(): Promise<AxiosResponse<AuthUser[]>> {
    return $api.get<AuthUser[]>('/auth/users')

  }

}

export default AuthUserService;