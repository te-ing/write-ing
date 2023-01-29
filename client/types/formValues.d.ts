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
  email: string;
  password: string;
}
export interface RegisterFormValues extends LoginFormValues {
  nickname: string;
  checkPassword: string;
}
