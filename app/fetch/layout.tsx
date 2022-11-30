import '@/app/globals.scss';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <h4>패치 데이터</h4>
      {children}
    </div>
  );
}
