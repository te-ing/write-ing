import React from 'react';
import styles from './Tag.module.scss';

const Tag = ({ label }: { label: string }) => {
  return <div className={styles.wrapper}>{label}</div>;
};

export default Tag;
