import { redirect } from 'next/navigation';

import { createClient } from '@/src/shared/api/server';
import { WishlistHeader } from '@/src/shared/ui';
import { List } from '@/src/shared/api/models';
import { Sidebar } from '@/src/shared/ui';
import { getListsByUserId } from '@/src/shared/api';

type LayoutProps = {
    children: React.ReactNode;
    params: { id: string };
};

export default async function Layout({ children, params }: LayoutProps) {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user?.id) {
        return redirect('/');
    }

    const { data: lists } = await getListsByUserId(supabase, user.id);

    return (
        <>
            <WishlistHeader isMyList />
            <div className='animate-in drawer max-h-[100vh] lg:drawer-open'>
                {children}
                <Sidebar listId={params.id} lists={lists as List[]} />
            </div>
        </>
    );
}
