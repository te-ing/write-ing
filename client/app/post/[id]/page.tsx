import { PostType } from 'types/post';
import { GetStaticPropsContext } from 'next';
import PostContent from 'components/Post/PostDetail/PostContent';
import PostDetail from 'components/Post/PostDetail';

const getPostDetail = async (id: string): Promise<PostType> => {
  const response = await fetch(`http://localhost:8080/api/post/${id}`);
  const data = await response.json();
  return data;
};

export default async function PostDetailPage(context: GetStaticPropsContext) {
  const post = await getPostDetail(context.params.id as string);

  return (
    <div className={''}>
      <PostDetail post={post} />
      {/* <Comments comments={test} /> */}
    </div>
  );
}
