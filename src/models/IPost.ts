export type IPost = {
  id: string;
  author: string,
  page: string,
  text: string,
  image: string,
  date: string,
  likeCount: number,
  dislikeCount: number,
  commentsCount: number,
  rated?: 'like' | 'dislike',
}