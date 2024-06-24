import { redirect } from 'next/navigation';

import { WishList } from '../../components/Wishlist';
import { createClient } from '@/utils/supabase/server';
import { getListById } from '@/utils/supabase/fetches';
import { Database } from '@/lib/schema';

type List = Database['public']['Tables']['list']['Row'];

export default async function Page({ params }: { params: Record<string, string> }) {
    const supabase = createClient();

    const { data: list } = await getListById(supabase, params.id);
    if (!list) {
        return redirect('/');
    }

    return <WishList list={list as List} />;
}
