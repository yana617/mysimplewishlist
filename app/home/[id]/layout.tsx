import { WishlistHeader } from '@/components/Header';
import { Sidebar } from '@/components/list/Sidebar';
import { Database } from '@/lib/schema';
import { getListsByUserId } from '@/utils/supabase/fetches';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

type List = Database['public']['Tables']['list']['Row'];

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
