import Link from 'next/link';
import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';
import { generatePrimaryButtonStyles, generateSecondaryButtonStyles } from '@/lib/styles';

export default async function AuthButton() {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    const signOut = async () => {
        'use server';

        const supabase = createClient();
        await supabase.auth.signOut();
        return redirect('/login');
    };

    return user ? (
        <div className='flex items-center gap-4'>
            <Link
                href='/home'
                className={generatePrimaryButtonStyles('px-3 py-2')}
            >
                Home
            </Link>
            <form action={signOut}>
                <button className={generateSecondaryButtonStyles('px-4 py-2')}>
                    Logout
                </button>
            </form>
        </div>
    ) : (
        <Link
            href='/login'
            className={generatePrimaryButtonStyles('px-3 py-2')}
        >
            Login
        </Link>
    );
}
