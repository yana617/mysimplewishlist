import { createClient } from '@/utils/supabase/server';
import AuthButton from './AuthButton';

export const Header = () => {
    const canInitSupabaseClient = () => {
        // This function is just for the interactive tutorial.
        // Feel free to remove it once you have Supabase connected.
        try {
            createClient();
            return true;
        } catch (e) {
            return false;
        }
    };

    const isSupabaseConnected = canInitSupabaseClient();

    return (
        <nav className='flex h-16 w-full justify-center border-b border-b-foreground/10'>
            <div className='flex w-full max-w-4xl items-center justify-between p-3 text-sm'>
                &#127880; My simple wishlist
                {isSupabaseConnected && <AuthButton />}
            </div>
        </nav>
    );
};
