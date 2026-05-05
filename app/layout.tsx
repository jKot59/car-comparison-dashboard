import type { Metadata } from 'next';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import './globals.scss';
import './antd.scss';
import { Header } from '@/components/Header/Header';

export const metadata: Metadata = {
  title: 'Car Comparison Dashboard | Compare Cars Side by Side',
  description: 'Compare different car models based on price, rating, horsepower, and more. Find your perfect car today.',
  keywords: 'car comparison, compare cars, car prices, car ratings, car dashboard',
  authors: [{ name: 'Car Dashboard Team' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <AntdRegistry>
          <Header />
          <main id='main-content'>{children}</main>
        </AntdRegistry>
      </body>
    </html>
  );
}
