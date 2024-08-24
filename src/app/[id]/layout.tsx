import { WishlistHeader } from '@/src/shared/ui';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className='w-full h-screen'>
            <WishlistHeader />
            {children}
        </div>
    );
}
