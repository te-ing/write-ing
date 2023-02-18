import styles from './PostCardWrapper.module.scss';
import { PostType } from 'types/post';
import PostCard from '../PostCard';

const PostCardWrapper = ({ posts }: { posts: PostType[] }) => {
  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>
        {posts.map((post) => {
          return <PostCard post={post} key={post.id} />;
        })}
      </div>
    </section>
  );
};

export default PostCardWrapper;
