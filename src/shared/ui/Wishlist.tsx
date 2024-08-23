'use client';

import { useCallback, useEffect, useState } from 'react';

import { createClient } from '@/src/shared/api/client';
import { generatePrimaryButtonStyles } from '@/src/shared/lib/styles';
import { Wish as WishType, List } from '@/src/shared/api/models';
import { Wish } from './Wish';
import { CreateWishModal } from './CreateWishModal';
import { getWishesByListId } from '../api';

export const Loading = () => {
    return (
        <div className='animate-in flex w-full h-full items-center justify-center'>
            <span className='loading loading-spinner loading-lg'></span>
        </div>
    );
};

export const Wishlist = ({ list, isMyList = false }: { list: List; isMyList?: boolean }) => {
    const supabase = createClient();
    const [wishes, setWishes] = useState<WishType[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchWishes = async () => {
            const { data, error } = await getWishesByListId(supabase, list.id);

            if (!error) {
                setWishes(data);
            }
            setIsLoading(false);
        };

        fetchWishes();

        supabase
            .channel('schema-db-changes')
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'list',
                    filter: `id=eq.${list.id}`,
                },
                () => {
                    console.log('UPDATED!');
                    fetchWishes();
                }
            )
            .subscribe();
    }, [supabase]);

    const copyToClipboard = useCallback(() => {
        navigator.clipboard.writeText(`https://mysimplewishlist.com/${list.id}`);
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <main className='flex h-[calc(100vh_-_64px)] w-full'>
            <div className='flex max-h-[calc(100vh_-_64px)] w-full items-center justify-center overflow-auto'>
                <div className='flex max-h-[calc(100vh_-_64px)] max-w-[600px] flex-col gap-2 py-8'>
                    <div className='mb-8 flex items-center justify-center gap-6'>
                        <b className='text-2xl'>{list.name}</b>
                        {isMyList && (
                            <button
                                className={generatePrimaryButtonStyles()}
                                //@ts-ignore
                                onClick={() => document.getElementById('create_wish_modal')?.showModal()}
                            >
                                + Add
                            </button>
                        )}
                    </div>
                    <div className='flex flex-col -ml-12 mobile:ml-0'>
                        {wishes
                            .sort((w) => (!!w.link ? -1 : 1))
                            .map((wish) => {
                                return <Wish key={wish.id} {...wish} isMyList={isMyList} />;
                            })}
                    </div>
                    {wishes.length === 0 && isMyList && <>No wishes, let's add one</>}
                </div>
            </div>

            <CreateWishModal listId={list.id} />

            {isMyList && (
                <button
                    className={generatePrimaryButtonStyles('absolute bottom-4 right-4')}
                    onClick={copyToClipboard}
                >
                    Copy share link
                </button>
            )}
        </main>
    );
};
