'use client';

import '@styles/globalStyles.scss';
import Header from 'components/Header/Header';
import { QueryClient, QueryClientProvider } from 'react-query';
import styles from './layout.module.scss';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <div className={styles.layout_wrapper}>
            <div className={styles.layout}>
              <Header />
              {children}
            </div>
          </div>
        </QueryClientProvider>
      </body>
    </html>
  );
}
