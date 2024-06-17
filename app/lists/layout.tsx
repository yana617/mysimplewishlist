import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';
import { AuthProvider } from '@/components/AuthProvider';

export default async function ListsLayout({ children }: { children: React.ReactNode }) {
    const supabase = createClient();

    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
        redirect('/login');
    }

    return <AuthProvider>{children}</AuthProvider>;
}
