import { PostType } from 'types/post';
import { GetStaticPropsContext } from 'next';
import PostContent from 'components/Post/PostContent';

const getPostDetail = async (id: any): Promise<PostType> => {
  const response = await fetch(`http://localhost:8080/api/post/${id}`);
  const data = await response.json();
  return data;
};

export default async function PostDetailPage(context: GetStaticPropsContext) {
  const post = await getPostDetail(context.params.id);

  return (
    <div className={''}>
      <PostContent content={post.content} />
      {/* <Comments comments={test} /> */}
    </div>
  );
}
