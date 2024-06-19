'use client';

import { useContext } from 'react';

import { AuthContext } from '@/components/AuthProvider';
import { Loading } from '@/components/Loading';
import { WishList } from './Wishlist';
import { Sidebar } from './Sidebar';

export default function Page({ params }: { params: any }) {
    const { userId, isLoading: isUserLoading } = useContext(AuthContext);

    if (isUserLoading) {
        return <Loading />;
    }

    if (!userId) {
        return <WishList listId={params.id} />;
    }

    return (
        <Sidebar listId={params.id}>
            <WishList listId={params.id} />
        </Sidebar>
    );
}
