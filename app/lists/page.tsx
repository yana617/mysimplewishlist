'use client';

import { useContext, useEffect, useState } from 'react';
import { Database } from '@/lib/schema';
import { createClient } from '@/utils/supabase/client';
import { CreateListModal } from '@/components/list/CreateListModal';
import { AuthContext } from '@/components/AuthProvider';

type List = Database['public']['Tables']['list']['Row'];

export default function Lists() {
    const supabase = createClient();
    const [lists, setLists] = useState<List[]>([]);
    const { userId } = useContext(AuthContext);

    const fetchLists = async () => {
        const { data, error } = await supabase
            .from('list')
            .select('id, name, user_id, created_at')
            .eq('user_id', userId);

        if (error) console.log('error', error);
        else setLists(data);
    };

    useEffect(() => {
        if (userId) {
            fetchLists();
        }
    }, [supabase, userId]);

    return (
        <div className='animate-in flex max-w-4xl flex-1 flex-col gap-20 p-8 px-3 opacity-0'>
            <main className='flex flex-1 flex-col gap-6'>
                <button
                    className='btn btn-primary'
                    //@ts-ignore
                    onClick={() => document.getElementById('new_list_modal')?.showModal()}
                >
                    Add new list
                </button>
                {lists?.map((list) => (
                    <a
                        key={list.id}
                        href={list.id}
                        className='card w-[500px] cursor-pointer bg-base-100 p-1 shadow-xl'
                    >
                        <div className='card-body'>
                            <h2 className='card-title'>{list.name}</h2>
                        </div>
                    </a>
                ))}
                <CreateListModal reloadLists={fetchLists} />
            </main>
        </div>
    );
}
