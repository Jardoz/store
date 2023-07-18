import type { Metadata } from 'next'
import { Urbanist } from 'next/font/google'

import ModalProvider from '@/providers/modalProvider';
import { Footer } from '@/components/footer';
import Navbar from '@/components/navbar';

import './globals.css'

const font = Urbanist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Store',
  description: 'E-commerce store app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ModalProvider />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
