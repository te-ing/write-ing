import styles from './layout.module.scss';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.postCard_wrapper}>{children}</div>
    </div>
  );
}
