import '@/app/globals.scss';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="background w-full min-h-full h-auto flex lg:flex-col">{children}</div>;
}
