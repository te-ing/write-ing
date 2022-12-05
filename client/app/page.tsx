import Head from 'next/head';
import styles from '@app/page.scss';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className={styles.title}>
        Welcome to <a href="/edit">글쓰기</a>
      </h1>
      <div>
        <h2>홈페이지</h2>
      </div>
    </div>
  );
}