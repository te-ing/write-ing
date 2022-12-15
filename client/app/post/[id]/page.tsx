import PostContent from 'components/Post/PostContent';
import { PostType } from 'types/post';

const getPost = async (params: { id: string }): Promise<PostType> => {
  const response = await fetch(`http://localhost:8080/post/${params.id}`);
  const { article } = await response.json();
  return article;
};

export default async function Post({ params }: { params: { id: string } }) {
  const post = await getPost(params);
  // const contentEl = document.createElement('div');
  // contentEl.innerHTML = post.content;

  return (
    <div className={''}>
      <PostContent content={post.content} />
    </div>
  );
}
