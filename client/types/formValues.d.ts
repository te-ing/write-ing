export interface EditFormValues {
  title: string;
  subtitle?: string;
  nickname: string;
  status: string;
  content: string;
  category?: string;
  tag?: string;
}

export interface LoginFormValues {
  id: string;
  password: string;
}
