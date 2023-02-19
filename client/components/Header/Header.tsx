import Image from 'next/image';
import Link from 'next/link';
import { Logo } from 'public/image/svg';
import styles from './header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <Link href="/">
        <Logo width={76} height={46} />
      </Link>
      <div className={styles.linkWrapper}>
        <div className={styles.link}>
          <Link href="/home">Home</Link>
          <Link href="/">About Me</Link>
          <Link href="/">Contact</Link>
        </div>
        <div className={styles.link}>
          <Link href="/login">Login</Link>
          <Link href="/write">Write</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
