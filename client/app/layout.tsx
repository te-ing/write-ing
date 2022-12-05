import '@styles/globalStyles.scss';
import Header from 'components/Header/Header';
import styles from './layout.module.scss';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className={styles.layout_wrapper}>
          <div className={styles.layout}>
            <Header />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
