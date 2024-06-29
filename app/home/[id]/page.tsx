import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';
import { getListById } from '@/utils/supabase/fetches';
import { Database } from '@/lib/schema';
import { WishList } from '@/components/Wishlist';

type List = Database['public']['Tables']['list']['Row'];

export default async function Page({ params }: { params: Record<string, string> }) {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user?.id) {
        return redirect('/');
    }

    const { data: list } = await getListById(supabase, params.id);
    if (!list || list.user_id !== user.id) {
        return redirect('/');
    }

    return (
        <>
            <input id='lists-drawer' type='checkbox' className='drawer-toggle' />
            <div className='drawer-content flex flex-col items-center justify-center'>
                <WishList list={list as List} isMyList />
            </div>
        </>
    );
}
