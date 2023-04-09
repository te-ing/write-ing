'use client';

import '@styles/globalStyles.scss';
import Header from 'components/Header/Header';
import { QueryClient, QueryClientProvider } from 'react-query';
import ErrorBoundary from 'utils/ErrorBoundary';
import styles from './layout.module.scss';
import { RecoilRoot } from 'recoil';
import RecoilModal from 'components/modal/RecoilModal';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body id="body">
        <RecoilRoot>
          <QueryClientProvider client={queryClient}>
            <div className={styles.layout_wrapper}>
              <div className={styles.layout}>
                <Header />
                <ErrorBoundary>{children}</ErrorBoundary>
              </div>
            </div>
            <RecoilModal />
          </QueryClientProvider>
        </RecoilRoot>
      </body>
    </html>
  );
}
