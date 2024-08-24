import { redirect } from 'next/navigation';

import { createClient } from '@/src/shared/api/server';
import { WishlistHeader } from '@/src/shared/ui';
import { Sidebar } from '@/src/shared/ui';
import { getListsByUserId } from '@/src/shared/api';

export const HomePage = async () => {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user?.id) {
        return redirect('/');
    }

    const { data: lists } = await getListsByUserId(supabase, user.id);

    if (!!lists?.length) {
        return redirect(`/home/${lists[0].id}`);
    }

    return (
        <>
            <WishlistHeader isMyList />
            <div className='animate-in drawer max-h-[calc(100vh_-_64px)] lg:drawer-open'>
                <input id='lists-drawer' type='checkbox' className='drawer-toggle' />
                <div className='drawer-content flex flex-col items-center justify-center'>No lists</div>
                <Sidebar lists={[]} />
            </div>
        </>
    );
}
