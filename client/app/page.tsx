import Head from 'next/head';
import styles from '@app/page.scss';
import Link from 'next/link';

export default function AppPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Welcome to <Link href="/edit">글쓰기</Link>
      </h1>
      <div>
        <h2>홈페이지</h2>
      </div>
    </div>
  );
}
