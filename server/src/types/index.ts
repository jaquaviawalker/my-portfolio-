export interface Post {
  id: number;
  title: string;
  content: string;
  created_at: Date;
  img_path: string;
}

export interface CreatePostDTO {
  title: string;
  content: string;
  img_path: string;
}

export interface ContactMe {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: Date;
}

export interface CreteContactMeDTO {
  name: string;
  email: string;
  message: string;
}
