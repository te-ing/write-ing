import Image from 'next/image';
import Link from 'next/link';

async function getData(params: string) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${params}`);
  return res.json();
}

export default async function Page({ params }) {
  const data = await getData(params.detailId);

  return (
    <main>
      <Link href={'/fetch'}>뒤로가기</Link>
      <div>유저 아이디: {data.id}</div>
      <div>
        이름: {data.name} / {data.username}
      </div>
      <div>
        <div>회사명: {data.company.name}</div>
        <div>캐치프라이즈: {data.company.catchPhrase}</div>
        <div>bs: {data.company.bs}</div>
        <Image src={'https://picsum.photos/200/300'} alt="랜덤이미지" width={200} height={300} />
      </div>
    </main>
  );
}
