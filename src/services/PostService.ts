import $api from "../http";
import { AxiosResponse } from "axios";

export type postRaw = {
  text: string,
  image?: string
}

export default class PostService {

  static async create(data: postRaw): Promise<AxiosResponse<any>> {
    return $api.post<any>('/posts/create', data)
  }
  static async update(data: {postId: string, data: postRaw}): Promise<AxiosResponse<any>> {
    return $api.patch<any>(`/posts/${data.postId}`, data.data)
  }

  static async getUsersPosts(username: string, dozen: number = 1) {
    return $api.get<any>(`/posts/user/${username}?dozen=${dozen}`)
  }
  
  static async remove(postId: string): Promise<AxiosResponse<any>> {
    return $api.delete<any>(`/posts/${postId}`)
  }
}