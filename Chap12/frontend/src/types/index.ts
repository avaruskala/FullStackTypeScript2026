
export interface LoginResponse {
  accessToken: string;
  user: User;
}
export interface PostList {
  data: Post[];
}
export interface User {
  id: number,
  username: string;
  role: string;
}
export interface Post {
  id: string;
  title: string;
  content: string;
}
