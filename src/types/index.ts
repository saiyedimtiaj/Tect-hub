export type TCreateUser = {
  name: string;
  email: string;
  password: string;
};
export type TLoginUser = {
  email: string;
  password: string;
};

export type TUser = {
  _id: string;
  name: string;
  email: string;
  role: string;
  profile: string;
  iat: number;
  exp: number;
  bio: string;
};

export interface IPost {
  content: string;
  userId?: string;
  images: string[];
  category: string;
  type: string;
  _id?: string;
}
