import styles from './postCard.module.scss';
import test1 from 'article/test1.json';

const PostCard = () => {
  console.log(test1);
  return (
    <div className={styles.post_card}>
      포스트카드
      <br />
      {test1.writeTime}
      <br />
      <br />
      {test1.title}
    </div>
  );
};

export default PostCard;
