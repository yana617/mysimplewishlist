import { GeistSans } from 'geist/font/sans';

import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { GoogleAnalytics } from '@/components/GoogleAnalytics';
import { AuthProvider } from '@/components/AuthProvider';

const defaultUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';

export const metadata = {
    metadataBase: new URL(defaultUrl),
    title: 'My Simple Wishlist',
    description: 'The fastest way to get gifts',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en' className={GeistSans.className}>
            <GoogleAnalytics />
            <body className='bg-background text-foreground'>
                <main className='flex min-h-screen flex-col items-center'>
                    <Header />
                    <AuthProvider>{children}</AuthProvider>
                    <Footer />
                </main>
            </body>
        </html>
    );
}
