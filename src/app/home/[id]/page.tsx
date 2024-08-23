import { WishlistPage } from '@/src/views/wishlist';

export default async function Page({ params }: { params: Record<string, string> }) {
    return <WishlistPage params={params} />;
}
