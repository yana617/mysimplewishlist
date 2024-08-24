import { GeistSans } from 'geist/font/sans';
import Head from 'next/head';

import './globals.css';
import { GoogleAnalytics } from '@/src/views/landing';
import { AuthProvider } from '@/src/shared/ui';

const defaultUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';

export const metadata = {
    metadataBase: new URL(defaultUrl),
    title: 'My Simple Wishlist - send it to your friends',
    description: 'The simplest wishlist to create and share with friends and family. Real-time updates, mobile and desktop compatible.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en' className={GeistSans.className}>
            <Head>
                <meta name='viewport' content='width=device-width, initial-scale=1.0' />
            </Head>
            <GoogleAnalytics />
            <body className='bg-background text-foreground'>
                <main className='flex min-h-screen flex-col items-center'>
                    <AuthProvider>{children}</AuthProvider>
                </main>
            </body>
        </html>
    );
}
