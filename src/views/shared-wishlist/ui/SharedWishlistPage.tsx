import { redirect } from 'next/navigation';

import { createClient } from '@/src/shared/api/server';
import { List } from '@/src/shared/api/models';
import { Wishlist } from '@/src/shared/ui';
import { getListById } from '@/src/shared/api';

export const SharedWishlistPage = async ({ params }: { params: Record<string, string> }) => {
    const supabase = createClient();

    const { data: list } = await getListById(supabase, params.id);
    if (!list) {
        return redirect('/');
    }

    return <Wishlist list={list as List} />;
};
