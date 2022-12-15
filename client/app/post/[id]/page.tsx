import PostContent from 'components/Post/PostContent';
import Comments from 'components/Comments/Comments';
import { PostType } from 'types/post';

const getPost = async (params: { id: string }): Promise<PostType> => {
  const response = await fetch(`http://localhost:8080/post/${params.id}`);
  const { article } = await response.json();
  return article;
};

const test = [
  {
    id: 1,
    writeTime: 'string',
    content: '댓글입니다',
    author: '유저1',
    nickname: 'string',
    password: 'string',
  },
  {
    id: 2,
    writeTime: 'string',
    content: '댓글이에요',
    author: '유저2',
    nickname: 'string',
    password: 'string',
  },
];

export default async function Post({ params }: { params: { id: string } }) {
  const post = await getPost(params);
  // const contentEl = document.createElement('div');
  // contentEl.innerHTML = post.content;

  return (
    <div className={''}>
      <PostContent content={post.content} />
      <Comments comments={test} />
    </div>
  );
}
