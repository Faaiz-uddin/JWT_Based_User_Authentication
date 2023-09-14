// import Image from 'next/image'
import Link from 'next/link'
export default function Home() {
  return (
    <ul>
    <li>
      <Link href="/">Home</Link>
    </li>
    <li>
      <Link href="/pages/about">Awwwbout12 Us</Link>
    </li>
    <li>
      <Link href="/blog/hello-world">Blog Post</Link>
    </li>
  </ul>
  )
}
