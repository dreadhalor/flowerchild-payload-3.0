import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Provider } from '@flowerchild/trpc/provider';
import { Toaster } from '@flowerchild/components/ui/sonner';
import { cn } from '@flowerchild/lib/utils';
import { Footer } from '@flowerchild/components/footer';
import { Navbar } from '@flowerchild/components/navbar/navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='bg-primary h-full p-0'>
      <body
        className={cn(
          'relative h-full p-0 font-sans antialiased',
          inter.className,
        )}
      >
        <main className='relative flex min-h-full flex-col'>
          <Provider>
            <Navbar />
            <div className='flex flex-1 flex-grow flex-col'>{children}</div>
            <Footer />
          </Provider>
        </main>
        <Toaster position='top-center' richColors />
      </body>
    </html>
  );
}
