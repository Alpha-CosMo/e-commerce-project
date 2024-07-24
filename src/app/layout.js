// import Header from '@/components/Header';
// import NavBar from '@/components/NavBar';
// import Footer from '@/components/Footer';

import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'E-Commerce',
  description: 'Buy all goods at cheaper rate',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
