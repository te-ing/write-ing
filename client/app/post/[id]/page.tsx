import { PostType } from 'types/post';
import { GetStaticPropsContext } from 'next';
import PostContent from 'components/Post/PostDetail/PostContent';
import PostDetail from 'components/Post/PostDetail/PostDetail';
import { Comments } from 'components/Comments';

const getPostDetail = async (id: string): Promise<PostType> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/post/${id}`);
  const data = await response.json();
  return data;
};

export default async function PostDetailPage(context: GetStaticPropsContext) {
  const post = await getPostDetail(context.params.id as string);

  return (
    <div className={''}>
      <PostDetail post={post} />
      <Comments post={post} />
    </div>
  );
}
