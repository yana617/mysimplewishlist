import Link from 'next/link';

import { createClient } from '@/utils/supabase/server';
import AuthButton from './AuthButton';

export const Header = ({ isLanding }: { isLanding?: boolean }) => {
    const canInitSupabaseClient = () => {
        try {
            createClient();
            return true;
        } catch (e) {
            return false;
        }
    };

    const isSupabaseConnected = canInitSupabaseClient();

    return (
        <nav className='z-30 flex h-16 w-full justify-center'>
            <div className='flex h-16 w-full items-center justify-between pr-12 text-sm'>
                <Link
                    href='/'
                    className={`mobile:bg-inherit h-full w-80 cursor-pointer py-5 text-center ${isLanding ? 'ml-20 text-white' : 'text-grey-black bg-base-200'}`}
                >
                    <p className='text-xl'>&#127880; My simple wishlist</p>
                </Link>
                {isSupabaseConnected && <AuthButton />}
            </div>
        </nav>
    );
};
