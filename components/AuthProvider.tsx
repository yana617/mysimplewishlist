'use client';

import { createClient } from '@/utils/supabase/client';
import { createContext, useEffect, useState } from 'react';

type AuthContextParams = {
    userId: string | undefined;
    isLoading: boolean;
};

export const AuthContext = createContext<AuthContextParams>({
    userId: undefined,
    isLoading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const supabase = createClient();
    const [userId, setUserId] = useState<string | undefined>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadUser = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser();

            setUserId(user?.id);
            setIsLoading(false);
        };

        loadUser();
    }, []);

    return <AuthContext.Provider value={{ userId, isLoading }}>{children}</AuthContext.Provider>;
};
