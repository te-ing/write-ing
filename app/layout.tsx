import Image from 'next/image';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header>
          <Image src={'/image/cat.png'} alt="cat" width={24} height={24} />
          글로벌 헤더
        </header>
        {children}
      </body>
    </html>
  );
}
