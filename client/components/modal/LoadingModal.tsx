import React from 'react';
import styles from './loadingModal.module.scss';

const LoadingModal = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.circle} />
    </div>
  );
};

export default LoadingModal;
