import React from 'react';
import styles from './loading.module.scss';

const Loading = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.circle} />
    </div>
  );
};

export default Loading;
