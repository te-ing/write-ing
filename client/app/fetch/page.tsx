import Link from 'next/link';

async function getData() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
  return res.json();
}
/**
// This request should be cached until manually invalidated.
// Similar to `getStaticProps`.
// `force-cache` is the default and can be omitted.
fetch(URL, { cache: 'force-cache' });

// This request should be refetched on every request.
// Similar to `getServerSideProps`.
fetch(URL, { cache: 'no-store' });

// This request should be cached with a lifetime of 10 seconds.
// Similar to `getStaticProps` with the `revalidate` option.
fetch(URL, { next: { revalidate: 10 } });
 */

// This is an async Server Component
export default async function Page() {
  const data = await getData();
  return (
    <main style={{ display: 'flex', flexDirection: 'column' }}>
      {data.map(({ name, username, id }) => {
        return <Link href={`fetch/${String(id)}`} key={id}>{`${name}_${username}`}</Link>;
      })}
    </main>
  );
}
