export interface UserInfoTypes {
  id: null;
  email: string;
  name: string;
  blogName: string;
  profileImage: string;
  nickName: string;
  introduce: string;
}

export interface ResponseUserInfoTypes {
  data: UserInfoTypes;
}

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

export interface PostTypes {
  Likers: {
    id: number;
    Like: {
      userId: number;
    };
  }[];
  id: number;
  comments: CommentTypes[];
  content: string;
  createdAt: string;
  image: null | {
    src: string;
  };
  title: string;
  user: {
    id: number;
    name: string;
    nickName: string;
    profileImage: string;
    introduce: string;
  };
  viewCnt: string;
}

export interface ResponsePostsTypes {
  data: PostTypes[];
}

export interface ResponseDetailPostTypes {
  data: PostTypes;
}

export interface UserRegistTypes {
  userId: string;
  name: string;
  introduce: string;
  nickName: string;
}

export interface CommentEditTypes {
  commentId: string;
  content: string;
}

export interface ChangeProfileFormTypes {
  nickName?: string;
  introduce?: string;
}
