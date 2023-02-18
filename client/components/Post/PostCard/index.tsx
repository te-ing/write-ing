import styles from './PostCard.module.scss';
import { PostType } from 'types/post';
import Link from 'next/link';
import dayjs from 'dayjs';
import { NavArrowIcon } from '@public/image/svg';

const PostCard = ({ post }: { post: PostType }) => {
  return (
    <Link href={`/post/${post.id}`} className={styles.wrapper}>
      <div className={styles.postHeader}>
        <h3>{post.title}</h3>
      </div>
      <div className={styles.postContent}>
        <p>{post.content.slice(0, 50)}</p>
      </div>
      <div className={styles.postFooter}>
        {dayjs(post.createdAt).format('YYYY. MM. DD')}
        <NavArrowIcon width={30} height={30} />
      </div>
    </Link>
  );
};

export default PostCard;
