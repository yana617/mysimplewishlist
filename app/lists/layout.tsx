import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';

export default async function ListsLayout({ children }: { children: React.ReactNode }) {
    const supabase = createClient();

    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
        redirect('/login');
    }

    return <>{children}</>;
}
