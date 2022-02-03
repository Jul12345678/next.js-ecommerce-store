import Link from 'next/link';

export default function Header() {
  return (
    <header>
      <Link href="/">
        <a>Home</a>
      </Link>

      <Link href="/about"></Link>
    </header>
  );
}
