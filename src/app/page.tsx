import Link from 'next/link';

const Home = () => {
  return (
    <ul className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-4 justify-center items-center">
      <li>
        <Link
          href="/products"
          className="block border-[1px] border-gray-300 rounded-md p-8">
          상품 목록 바로가기
        </Link>
      </li>
      <li>
        <Link
          href="/products/new"
          className="block border-[1px] border-gray-300 rounded-md p-8">
          상품 등록 바로가기
        </Link>
      </li>
    </ul>
  );
};

export default Home;
