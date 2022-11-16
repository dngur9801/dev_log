export interface SignUpTypes {
  email: string;
  password: string;
  re_password: string;
}

export interface LocalLoginTypes {
  email: string;
  password: string;
}

export interface RegistOrEditTypes {
  file?: HTMLInputElement['files'];
  title: string;
  content: string;
  id?: string;
}

export interface registCommentTypes {
  postId: string;
  comment: string;
}

export interface CommentTypes {
  id: string;
  content: string;
  createdAt: string;
  user: {
    name: string;
    profileImage: string;
  };
}
