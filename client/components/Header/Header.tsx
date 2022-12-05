import Image from 'next/image';
import Link from 'next/link';
import styles from './/header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <Link href="/">
        <Image src={'/image/logo.svg'} alt="logo" width={76} height={46} priority />
      </Link>
      <div className={styles.Link}>
        <Link href="/home">Home</Link>
        <Link href="/">About Me</Link>
        <Link href="/">Contact</Link>
      </div>
    </header>
  );
};

export default Header;
