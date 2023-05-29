// import { AuthResponse } from './../models/response/AuthResponse';
import { IProfile } from '../models/IProfile';

import $api from "../http";
import { AxiosResponse } from "axios";


export default class FriendService {

   // get user friends data
   static async getUserFriends(username: string): Promise<AxiosResponse<any>> { // Y
    return $api.get<any>(`/friends/list/${username}`)
  }
   // invite Friend
   static async inviteFriend(userId: string): Promise<AxiosResponse<any>> { // Y
    return $api.post<any>(`/friends/invite`, {id: userId})
  }
   // accept invite
   static async acceptFriend(userId: string, notificationId: string ): Promise<AxiosResponse<any>> { // Y
    return $api.post<any>(`/friends/accept`, {id: userId, notificationId})
  }
   // decline invite
  static async declineFriend(userId: string, notificationId: string): Promise<AxiosResponse<any>> { // Y
    console.log('Notification', notificationId)
    return $api.post<any>(`/friends/decline`, {id: userId, notificationId})
  }
  // get remove friend
  static async removeFriend(userId: string): Promise<AxiosResponse<any>> { // Y
    return $api.delete<any>(`/friends/remove`, {data: {id: userId}})
  }
}