import Link from 'next/link';

const Home = () => {
  return (
    <ul>
      <li>
        <Link href="/products">상품 목록 바로가기</Link>
      </li>
      <li>
        <Link href="/products/new">상품 등록 바로가기</Link>
      </li>
    </ul>
  );
};

export default Home;
