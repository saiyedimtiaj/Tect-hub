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
};
