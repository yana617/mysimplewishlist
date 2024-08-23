import { WishlistPage } from '@/src/fsd-pages/wishlist';

export default async function Page({ params }: { params: Record<string, string> }) {
    return <WishlistPage params={params} />;
}
