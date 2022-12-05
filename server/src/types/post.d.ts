export interface PostType {
  id: number;
  writeTime: string;
  title: string;
  subtitle: string;
  content: string;
  status: 'public' | 'private' | 'temp';
  tag: '회고' | '스터디' | '기록';
  like: [];
  comment: [];
}

export interface PostEditType {
  title: string;
  subtitle: string;
  content: string;
  status: 'public' | 'private' | 'temp';
  tag: '회고' | '스터디' | '기록';
}
