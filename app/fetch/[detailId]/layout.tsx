import '@/app/globals.scss';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <h5>상세페이지</h5>
      {children}
    </div>
  );
}
