import styles from './postCard.module.scss';
import { PostType } from 'types/post';
import Link from 'next/link';

const PostCard = ({ post }: { post: PostType }) => {
  console.log(post);
  return (
    <Link href={`/post/${post.id}`}>
      <div className={styles.post_card}>
        포스트카드
        <br />
        {post.createdAt}
        <br />
        <br />
        {post.title}
      </div>
    </Link>
  );
};

export default PostCard;
