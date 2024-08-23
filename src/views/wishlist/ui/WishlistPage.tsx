import { redirect } from 'next/navigation';

import { createClient } from '@/src/shared/api/server';
import { Wishlist } from '@/src/shared/ui';
import { List } from '@/src/shared/api/models';
import { getListById } from '@/src/shared/api';

export const WishlistPage = async ({ params }: { params: Record<string, string> }) => {
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
                <Wishlist list={list as List} isMyList />
            </div>
        </>
    );
}
