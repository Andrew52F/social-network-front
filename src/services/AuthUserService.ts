import { IUser } from './../models/IUser';
import { AuthResponse } from './../models/response/AuthResponse';
import $api from "../http";
import { AxiosResponse } from "axios";

export default class AuthUserService {
  static async fetchUsers(): Promise<AxiosResponse<IUser[]>> {
    return $api.get<IUser[]>('/auth/users')

  }

}