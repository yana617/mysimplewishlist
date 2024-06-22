import Link from 'next/link';

import { createClient } from '@/utils/supabase/server';
import AuthButton from './AuthButton';
import { getListById } from '@/utils/supabase/fetches';

const HOME_KEY = 'home';

export const Header = async ({ isLanding, listId }: { isLanding?: boolean; listId?: string }) => {
    const supabase = createClient();

    let isMyList = false;

    if (listId) {
        const { data } = await getListById(supabase, listId);

        const {
            data: { user },
        } = await supabase.auth.getUser();

        isMyList = user?.id === data?.user_id || !!user?.id && listId == HOME_KEY;
    }

    return (
        <nav className='z-30 flex h-16 w-full justify-center'>
            <div className='flex h-16 w-full items-center justify-between pr-12 text-sm mobile:pr-4'>
                <Link
                    href='/'
                    className={`mobile:bg-inherit h-full w-80 cursor-pointer py-5 text-center ${isLanding ? 'ml-20 text-white' : ''}${isMyList ? 'text-grey-black bg-base-200' : ''} mobile:ml-2`}
                >
                    <p className='text-xl mobile:mr-2'>&#127880; My simple wishlist</p>
                </Link>
                <AuthButton />
            </div>
        </nav>
    );
};
