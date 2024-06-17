'use client';

import { createClient } from '@/utils/supabase/client';
import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext<{ userId: string | undefined }>({ userId: undefined });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const supabase = createClient();
    const [userId, setUserId] = useState<string | undefined>();

    useEffect(() => {
        const loadUser = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser();

            setUserId(user?.id);
        };

        loadUser();
    }, []);

    return <AuthContext.Provider value={{ userId }}>{children}</AuthContext.Provider>;
};
