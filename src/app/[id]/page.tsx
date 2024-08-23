import { SharedWishlistPage } from '@/src/views/shared-wishlist';

export default async function Page({ params }: { params: Record<string, string> }) {
    return <SharedWishlistPage params={params} />;
}
