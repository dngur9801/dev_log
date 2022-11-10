export interface SignUpTypes {
  email: string;
  password: string;
  re_password: string;
}

export interface LocalLoginTypes {
  email: string;
  password: string;
}

export interface UserInfoTypes {
  email: string;
  name: string;
}

export interface RegistOrEditTypes {
  file?: HTMLInputElement['files'];
  title: string;
  content: string;
  id?: string;
}
