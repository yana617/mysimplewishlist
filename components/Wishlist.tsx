'use client';

import { useCallback, useEffect, useState } from 'react';

import { Database } from '@/lib/schema';
import { Wish } from '@/components/wish/Wish';
import { createClient } from '@/utils/supabase/client';
import { CreateWishModal } from '@/components/wish/CreateWishModal';
import { getWishesByListId } from '@/utils/supabase/fetches';
import { Loading } from '@/components/Loading';
import { generatePrimaryButtonStyles } from '@/lib/styles';

type List = Database['public']['Tables']['list']['Row'];
type Wish = Database['public']['Tables']['wish']['Row'];

export const WishList = ({ list, isMyList = false }: { list: List; isMyList?: boolean }) => {
    const supabase = createClient();
    const [wishes, setWishes] = useState<Wish[]>([]);
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
