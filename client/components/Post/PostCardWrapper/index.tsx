import styles from './PostCardWrapper.module.scss';
import { PostType } from 'types/post';
import PostCard from '../PostCard';

const PostCardWrapper = ({ posts }: { posts: PostType[] }) => {
  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>
        {posts.length ? (
          posts.map((post) => {
            return <PostCard post={post} key={post.id} />;
          })
        ) : (
          <h3>포스트가 존재하지 않습니다.</h3>
        )}
      </div>
    </section>
  );
};

export default PostCardWrapper;
