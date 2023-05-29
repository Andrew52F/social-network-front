// import { AuthResponse } from './../models/response/AuthResponse';
import { IProfile } from '../models/IProfile';

import $api from "../http";
import { AxiosResponse } from "axios";


export default class UserService {

  static async createProfile(values: IProfile): Promise<AxiosResponse<any>> {
    return $api.post<any>('/users/', values)
  }
  // update

  //get user Profile
  static async getUserProfile(username: string): Promise<AxiosResponse<any>> { // Y
    return $api.get<any>(`/users/${username}/profile`)
  }
  // get user friends data
  static async getUserFriends(username: string): Promise<AxiosResponse<any>> { // Y
    return $api.get<any>(`/friends/list/${username}`)
  }
  // get user pages data
  static async getUserPages(username: string): Promise<AxiosResponse<any>> {
    return $api.get<any>(`/users/${username}/pages`)
  }
  // get user persecuted users data
  static async getUserPersecutedUsers(username: string): Promise<AxiosResponse<any>> {
    return $api.get<any>(`/users/${username}/persecutedUsers`)
  }
  
}