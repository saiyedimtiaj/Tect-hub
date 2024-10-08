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
  membershipEnd: Date;
  status: string;
  isLoggedIn: boolean;
  lastLogin: Date;
};

export interface IPost {
  content: string;
  userId?: TUser;
  images: string[];
  category: string;
  type: string;
  _id?: string;
  createdAt?: string;
  updatedAt: string;
}

export type TComment = {
  _id: string;
  message: string;
  userId: TUser;
  postId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TUserVote = {
  userId: string;
  _id: string;
};

export interface TVote {
  _id: string;
  postId: string;
  votes: TUserVote[];
  __v: number;
}

export interface TPayment {
  paymentId: string;
  amount: number;
  status: string;
  userId: TUser;
  createdAt: string;
  updatedAt: string;
}

export interface PostDetails {
  _id: string;
  content: string;
  userId: string;
  images: string[];
  category: string;
  createdAt: string;
}

export interface UserDetails {
  _id: string;
  name: string;
  email: string;
  profile: string;
  role: string;
  bio: string;
}

export interface TMostLikePost {
  _id: string;
  content: string;
  userId: TUser;
  images: string[];
  category: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  likeCount: number;
}
