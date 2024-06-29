import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';
import { getListsByUserId } from '@/utils/supabase/fetches';
import { WishlistHeader } from '@/components/Header';
import { Database } from '@/lib/schema';
import { Sidebar } from '@/components/list/Sidebar';

type List = Database['public']['Tables']['list']['Row'];

export default async function Page() {
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
                <Sidebar lists={lists as List[]} />
            </div>
        </>
    );
}
