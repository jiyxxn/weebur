import type { Metadata } from 'next';
import './globals.css';
import Providers from './components/Providers';

export const metadata: Metadata = {
  title: 'Weebur 과제_김지윤',
  description: '상품 리스트와 등록 폼 구현',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
