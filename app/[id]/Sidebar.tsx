'use client';

import { useContext, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { AuthContext } from '@/components/AuthProvider';
import { Database } from '@/lib/schema';
import { createClient } from '@/utils/supabase/client';
import { getListsByUserId, insertList } from '@/utils/supabase/fetches';
import { Loading } from '@/components/Loading';
import { generatePrimaryButtonStyles, generateSecondaryButtonStyles } from '@/lib/styles';

type List = Database['public']['Tables']['list']['Row'];

const HOME_KEY = 'home';

export const Sidebar = ({ children, listId }: React.PropsWithChildren<{ listId: string }>) => {
    const supabase = createClient();
    const [lists, setLists] = useState<List[]>([]);
    const { userId } = useContext(AuthContext);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    const [newListName, setNewListName] = useState('');
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        const fetchLists = async () => {
            const { data, error } = await getListsByUserId(supabase, userId!);

            if (!error) {
                setLists(data);
            }
            setIsLoading(false);
        };

        if (userId && listId !== HOME_KEY) {
            fetchLists();
        }
    }, [supabase, userId]);

    if (listId == HOME_KEY && lists.length) {
        router.push(`/${lists[0].id}`);
    }

    const contentComponent = useMemo(() => {
        if (isLoading) {
            return <Loading />;
        }

        if (!lists.length) {
            return <>No data</>;
        }

        return <>{children}</>;
    }, [lists.length, isLoading]);

    const onAddNewList = async () => {
        await insertList(supabase, newListName, userId!);
        setNewListName('');
    };

    return (
        <div className='animate-in drawer max-h-[calc(100vh_-_64px)] lg:drawer-open'>
            <input id='my-drawer-2' type='checkbox' className='drawer-toggle' />
            <div className='drawer-content flex flex-col items-center justify-center'>
                {/* Page content here
                <label htmlFor='my-drawer-2' className='btn btn-primary drawer-button lg:hidden'>
                    Open drawer
                </label> */}

                {contentComponent}
            </div>
            <div className='drawer-side max-h-[calc(100vh_-_64px)]'>
                <label htmlFor='my-drawer-2' aria-label='close sidebar' className='drawer-overlay'></label>
                <ul className='menu min-h-full w-80 bg-base-200 p-4 text-base-content'>
                    {lists.map((list) => (
                        <li key={list.id} className={list.id === listId ? 'rounded-lg bg-base-300' : ''}>
                            <Link href={`/${list.id}`}>{list.name}</Link>
                        </li>
                    ))}

                    {isAdding && (
                        <input
                            value={newListName}
                            onChange={(e) => setNewListName(e.target.value)}
                            type='text'
                            placeholder='Enter a list name'
                            className='input input-bordered mt-2 h-[36px] w-full'
                        />
                    )}

                    <div className='mt-4 flex w-full justify-between'>
                        <button
                            className={generatePrimaryButtonStyles(isAdding ? 'w-[48%]' : 'w-full')}
                            onClick={() => {
                                if (!isAdding) {
                                    setIsAdding(true);
                                } else {
                                    onAddNewList();
                                    setIsAdding(false);
                                }
                            }}
                        >
                            {!isAdding ? '+ Add' : 'Save'}
                        </button>
                        {isAdding && (
                            <button
                                className={generateSecondaryButtonStyles('w-[48%]')}
                                onClick={() => {
                                    setIsAdding(false);
                                    setNewListName('');
                                }}
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </ul>
            </div>
        </div>
    );
};
